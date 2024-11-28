import React from "react";
import { useSocketContext } from "../contexts/socketContext";

export default function ProfileComponent({ name }) {
  const { joinRoom } = useSocketContext();
  return (
    <div
      onClick={() => {
        joinRoom(name);
      }}
      className="border-b-2 border-solid border-gray-200 p-5 hover:bg-slate-200 transition"
    >
      {name}
    </div>
  );
}
