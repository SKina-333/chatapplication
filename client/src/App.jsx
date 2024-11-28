import { useState } from "react";

import SideBar from "./components/SideBar";
import ChatBox from "./components/ChatBox";



function App() {
  
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen md:p-8">
      <div className="md:grid md:grid-cols-5 md:gap-5 md:w-full md:h-full lg:w-6/8 lg:h-2/3 xl:w-4/6">
        <SideBar />
        <ChatBox />
      </div>
      
    </div>
  );
}

export default App;
