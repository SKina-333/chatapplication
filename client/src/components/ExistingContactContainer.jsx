import React from "react";
import UserContactComponent from "./UserContactComponent";
import { useSocketContext } from "../contexts/socketContext";

export default function ExistingContactContainer() {
  const { contacts } = useSocketContext();

  return (
    <>
      <div className="flex flex-col gap-2">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <>
              <UserContactComponent
                Key={contact.contact_id}
                name={contact.Users_Contacts_contact_idToUsers.username}
              />
            </>
          ))
        ) : (
          <div>no contact</div>
        )}
      </div>
    </>
  );
}
