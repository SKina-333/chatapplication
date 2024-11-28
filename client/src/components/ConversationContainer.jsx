import React from "react";
import ProfileComponent from "./ProfileComponent";

import { useSocketContext } from "../contexts/socketContext";

export default function ConversationContainer() {
  const { allRoom } = useSocketContext();

  return (
    <>
      {allRoom.map((room) => (
        <ProfileComponent key={room} name={room} />
      ))}
    </>
  );
}
