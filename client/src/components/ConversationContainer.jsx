import React from "react";
import ProfileComponent from "./ProfileComponent";

import { useSocketContext } from "../contexts/socketContext";

export default function ConversationContainer() {
  const { joinRoom, publicRooms,setCurrentRoom } = useSocketContext();

  return (
    <>
      {publicRooms.map((room) => (
        <ProfileComponent
          key={room}
          onClick={() => {
            joinRoom(room);
            setCurrentRoom(room);
          }}
          name={room}
        />
      ))}
    </>
  );
}
