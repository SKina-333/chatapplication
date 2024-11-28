# chatapplication

Live Website: https://chat-application-client-w7e2.onrender.com

This application is a chat application where you can interact with other people in public and private chat room. 

### Technologies

- React
- Node JS
- Postgres


### Main Dependencies
- Prisma ORM
- Express
- Passport JWT and Google Oauth 2.0
- Tailwind CSS
- Socket IO

### Challenges
My biggest challenge in this project is learning how to integrate user authentication using 2 of the Passport JS strategies (JWT and GoogleOauth) and using that user authentication to authenticate user when connecting to socket io. it provides me with a better understanding of how to handle user authentication around socket io and also how to use socket io to handle user messages and channels. Other problems include: 
- Understanding the basic concept of socket io events and rooms which is affecting how I am writing my whole socket io code and the application
- Understanding the basic idea of user socket connection
- Handling Google API and callbacks when using Google OAuth Authentication.
- Creating a database model in order to handle the chat application and also user authentication

### Future Feature
This project currently allows users to access chat rooms, add users, and create private chat rooms but it is far from being called as fully complete. However, the Current version is fully usable. Future updates include:
#### UI & UX
- Ensure that the user receives a response notification when performing an action (such as logging in, finding contact, and adding contact)
- Proper chat box designs that provide a better user experience
- Sort user groups based on recent chats and recently received message
#### Functional
- Have a register page that can register users either via Google or via username/password (if users chose Google, they would be redirected to another form that allows them to create their password)
- Logout page
- Ensure that the site frequently validatesthe  token and the expiry date of every request (make sure to delete the token and reroute the user if the invalidated or incorrect validation token)
- Allow the user to leave the room
- Allow user to delete contact

# How to Install and Run Project
1. Install all the dependencies in both Client and Server
```
npm install
```
2. Generate Public Private Key pairs for creating and signing signature (Server Side)
```
cd etc/secretes
node generateKeyPairs.js
```
3. Set up .env file 
```
// You will need to have in the file (DATABASE_URL and DIRECT_URL will be used to connect with PrismaORM)
SERVER_PORT =
DATABASE_URL=
DIRECT_URL=
PRIV_KEY= (For Production)
NODE_ENV = "development"
GOOGLE_CLIENT_ID = 
GOOGLE_CLIENT_SECRET = 
GOOGLE_CALLBACK_URL = 
```
4. Run the application
Client-Side
```
npm run dev
```
Server-side
```
nodemon start
```

# How to use this application
For checking out the live version, you can use this credential
username: Admin
password: 123
