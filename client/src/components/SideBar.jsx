import React, {useState} from "react";
import ButtonComponent from "./ButtonComponent";

import ConversationContainer from "./ConversationContainer";
import AddContactContainer from "./AddContactContainer";

export default function SideBar() {
  const [currentActive, setCurrentActive] = useState('Conversations');
  
  return (
    <div className="bg-white rounded-xl shadow-lg md:p-5 md:col-start-1 md:col-span-2 flex flex-col gap-5">
      <div className="flex flex-row gap-5 justify-center">
        <ButtonComponent buttonName="Conversations" setActive={setCurrentActive} currentActive={currentActive}/>
        <ButtonComponent buttonName="Add new contact" setActive={setCurrentActive} currentActive={currentActive}/>
      </div>
      <div className="p-2 grow overflow-y-auto h-96">
        {currentActive==='Conversations' ? (
            <ConversationContainer/>   
        ):(
            <AddContactContainer />
        )}
        
      </div>
      <div className="p-2 self-end font-bold">
        user id: <span className="text-red-900">12345</span>
      </div>
    </div>
  );
}
