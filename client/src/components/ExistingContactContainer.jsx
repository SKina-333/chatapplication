import React from "react";
import UserContactComponent from "./UserContactComponent";

export default function ExistingContactContainer() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <UserContactComponent />
        <UserContactComponent />
        <UserContactComponent />
      </div>
    </>
  );
}
