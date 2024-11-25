import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";

import ConversationContainer from "./ConversationContainer";
import AddContactContainer from "./AddContactContainer";

import ConversationFormComponent from "./ConversationFormComponent";

export default function SideBar() {
  const [currentActive, setCurrentActive] = useState("Conversations");
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConversationFormComponent open={open} setOpen={setOpen} />

      <div className="bg-white rounded-xl shadow-lg md:p-5 md:col-start-1 md:col-span-2 flex flex-col gap-5">
        <div className="flex flex-row gap-5 justify-center">
          <ButtonComponent
            buttonName="Conversations"
            onClick={setCurrentActive}
            currentActive={currentActive}
          />
          <ButtonComponent
            buttonName="Add new contact"
            onClick={setCurrentActive}
            currentActive={currentActive}
          />
        </div>
        <div className="p-2 grow overflow-y-auto h-96">
          {currentActive === "Conversations" ? (
            <ConversationContainer />
          ) : (
            <AddContactContainer />
          )}
        </div>
        <div className="flex flex-row justify-between items-center">
          {currentActive === "Conversations" && (
            <div className="shrink px-5">
              <ButtonComponent
                buttonName="Create Conversation"
                onClick={() => {setOpen(true)}}
              />
            </div>
          )}

          <div className="p-2 self-end font-bold">
            user id: <span className="text-red-900">12345</span>
          </div>
        </div>
      </div>
    </>
  );
}
