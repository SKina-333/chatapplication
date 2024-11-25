import React from "react";

export default function ButtonComponent({ buttonName, onClick, currentActive }) {
  return (
    <button
      onClick={() => {
        if (currentActive !== buttonName){
          onClick(buttonName);
            
        }
      }}
      className="bg-blue-600 p-2 rounded-3xl w-full text-white text-sm  hover:shadow-lg transition hover:bg-blue-700"
    >
      {buttonName}
    </button>
  );
}
