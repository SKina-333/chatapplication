import React from "react";
import {PaperAirplaneIcon} from '@heroicons/react/24/solid'


export default function ChatBox() {
  return (
    <div className="bg-white rounded-xl shadow-lg w-full md:p-5 md:col-start-3 md:col-span-3 flex flex-col">
      ChatBox - Group Name
      <div className="grow border-solid border-black border-2 p-2">
        textBox
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="grow">
          <input
            id="message"
            name="message"
            type="text"
            placeholder="Type your message"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
          />
        </div>
        <button className="bg-blue-500 rounded-full p-2 hover:bg-blue-600 transition"><PaperAirplaneIcon className="size-6 text-white"/></button>
      </div>
    </div>
  );
}
