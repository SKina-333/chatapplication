import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState("");
  const [messagesByRoom, setMessagesByRoom] = useState({});
  const [userName, setUserName] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [allRoom, setAllRoom] = useState([]);

  const token = localStorage.getItem("id_token");

  const socketRef = useRef(null);

  useEffect(() => {
    if (token && !socketRef.current) {
      connectSocket(token);
    } else {
      disconnectSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token]);

  const connectSocket = (token) => {
    if (socketRef.current) return;

    const socketIo = io("https://chat-application-server-nrwd.onrender.com", {
      extraHeaders: { Authorization: token },
      autoConnect: false,
    });

    socketIo.connect();
    socketRef.current = socketIo;

    socketIo.on("connect", () => {
      console.log("Socket connected");

      if (!userName) {
        socketIo.on("user-info", (userInfo) => {
          setUserName(userInfo);
        });
      }
      socketIo.emit("get-contacts");
    });

    socketIo.on("disconnect", () => {
      console.log("Socket disconnected.");
    });

    //LOAD ROOMS OPERATION (PUBLIC and PRIVATE)
    socketIo.emit("get-rooms");
    socketIo.on("rooms-list", (rooms) => {
      console.log("Available rooms:", rooms);
      const roomNames = rooms.map((room) => room.name);
      setAllRoom(roomNames);
    });
    //

    //LOAD ROOM MESSAGE FROM AVAILABLE CHANNELS
    socketIo.on("room-message", (roomMessages) => {
      setMessagesByRoom(roomMessages);
    });
    //

    socketIo.on("testing", (message) => {
      console.log(message);
    });

    //LOAD CONTACTS
    socketIo.on("get-contacts", (Contacts) => {
      setContacts(Contacts);
    });

    socketIo.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      if (err.message === "Authentication error") {
        console.error("Authentication error: Clearing session");
        // Clear storage and redirect to login if authentication fails
      }
    });
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      console.log("Disconnecting socket");
      socketRef.current.disconnect();
      socketRef.current = null;
      setUserName(null);
      setContacts([]);
      setMessagesByRoom({});
      setAllRoom([]);
      setCurrentRoom("");
    }
  };

  const joinRoom = (roomName) => {
    if (socketRef.current) {
      socketRef.current.emit("join-room", roomName);
      setCurrentRoom(roomName);
    }
  };

  const sendMessage = (message) => {
    if (socketRef.current && currentRoom) {
      socketRef.current.emit("send-message", {
        roomName: currentRoom,
        message,
      });
    }
  };

  const addContact = (username) => {
    if (socketRef.current) {
      socketRef.current.emit("add-contact", username);
    }
  };

  const addPrivRoom = (groupName, contactIds) => {
    if (socketRef.current) {
      socketRef.current.emit("add-private-room", { groupName, contactIds });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        currentRoom,
        messagesByRoom,
        joinRoom,
        sendMessage,
        userName,
        connectSocket,
        disconnectSocket,
        allRoom,
        addContact,
        contacts,
        addPrivRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};
