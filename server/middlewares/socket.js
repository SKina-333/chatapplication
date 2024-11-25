const { Server } = require("socket.io");
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const setupSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication error: Token missing"));
    }

    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err || !user) {
        console.error("Authentication failed:", err || info.message);
        return next(new Error("Authentication error"));
      }

      socket.user = user;
      console.log(`Authenticated user: ${user.username} (${user.id})`);
      next();
    })(socket.request, {}, next);
  });

  io.on("connection", (socket) => {
    console.log(
      `New client connected: ${socket.id}, User: ${socket.user.username} (${socket.user.id})`
    );

    socket.emit("user-info", {
      senderID: socket.user.id,
      sender: socket.user.username,
    });

    socket.on("get-public-rooms", async () => {
      try {
        // Example: Fetching rooms from Prisma database
        const rooms = await prisma.Rooms.findMany({
          where: {
            type: "public",
          },
          select: {
            type: true,
            name: true,
          },
        });

        // Send the list of rooms back to the client
        socket.emit("public-rooms-list", rooms);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    });

    socket.on("send-message", async ({ roomName, message }) => {
      try {
        const currentRoom = await prisma.Rooms.findFirst({
          where: {
            name: roomName,
          },
        });
        if (currentRoom) {
          await prisma.Messages.create({
            data: {
              room_id: currentRoom.id,
              sender_id: socket.user.id,
              text: message,
            },
          });

          const roomMessages = await prisma.Rooms.findFirst({
            where: {
              name: roomName,
            },
            select: {
              id: true,
              Messages: {
                select: {
                  room_id: true,
                  sender_id: true,
                  text: true,
                  created_at: true,
                  Users: {
                    select: {
                      username: true,
                    },
                  },
                },
              },
            },
          });

          // Access the room ID and its messages
          if (roomMessages) {
            io.to(roomName).emit("room-message", roomMessages.Messages);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("join-room", async (roomName) => {
      try {
        const roomID = await prisma.Rooms.findFirst({
          where: {
            name: roomName,
          },
          select: {
            id: true,
          },
        });

        console.log("user joined room: ", roomID);

        if (roomID) {
          socket.leaveAll();
          socket.join(roomName);

          const roomMessages = await prisma.Messages.findMany({
            where: {
              room_id: roomID.id,
            },
            select: {
              room_id: true,
              sender_id: true,
              text: true,
              created_at: true,
              Users: {
                select: {
                  username: true,
                },
              },
            },
          });

          if (roomMessages) {
            console.log(roomMessages);
            socket.emit("room-message", roomMessages);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    });

    socket.on("add-contact", async (username) => {
      try {
        const userId = socket.user.id; // The current user's ID

        // Perform the operations in a transaction
        const result = await prisma.$transaction(async (prisma) => {
          // Step 1: Search for the contact by username
          const searchContact = await prisma.users.findUnique({
            where: { username },
          });

          if (!searchContact) {
            throw new Error("User not found");
          }

          // Step 2: Add the contact
          await prisma.contacts.create({
            data: {
              user_id: userId,
              contact_id: searchContact.id,
            },
          });

          // Step 3: Fetch the updated user contacts
          const userContacts = await prisma.contacts.findMany({
            where: { user_id: userId },
            select: {
              contact_id: true,
              Users_Contacts_contact_idToUsers: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          });

          return userContacts;
        });

        // Emit the result outside the transaction
        console.log(result);
        socket.emit("get-contacts", result);
      } catch (error) {
        console.error(error.message || "An error occurred");
      }
    });
    socket.on("get-contacts", async () => {
      try {
        const getContact = await prisma.Contacts.findMany({
          where: {
            user_id: socket.user.id,
          },
          select: {
            contact_id: true,
            Users_Contacts_contact_idToUsers: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        });
        console.log(getContact)
        socket.emit("get-contacts",getContact)
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = setupSocket;
