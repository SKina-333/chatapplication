import React, { useState } from "react";
import InputGroupComponent from "./InputGroupComponent";
import ExistingContactContainer from "./ExistingContactContainer";
import { useSocketContext } from "../contexts/socketContext";

export default function AddContactContainer() {
  const [searchValue, setSearchValue] = useState("");
  const { addContact } = useSocketContext();

  return (
    <>
      <form className="flex flex-col gap-2">
        <InputGroupComponent
          labelName="Add user by name"
          inputName="username"
          type="text"
          value={searchValue}
          placeholder="Enter a username or ID to add"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            addContact(searchValue);
          }}
          className="w-full p-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Add Contact
        </button>
      </form>
      <div className="relative flex justify-center items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <p className="absolute text-center mx-auto w-max px-4 bg-white font-bold text-gray-700">
          Existing Contacts
        </p>
      </div>
      <div className="flex flex-col">
        <ExistingContactContainer />
      </div>
    </>
  );
}
