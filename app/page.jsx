"use client";

import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#292a2d] text-white flex relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${
          expand ? "w-64" : "w-16"
        }`}
      >
        <Sidebar expand={expand} setExpand={setExpand} />
      </div>

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          expand ? "ml-64" : "ml-16"
        } relative pb-16`}
      >
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 bg-[#1f1f1f]">
          <Image
            onClick={() => setExpand(!expand)}
            src={assets.menu_icon}
            alt="menu"
            className="w-6 h-6 cursor-pointer"
          />
          <Image
            src={assets.chat_icon}
            alt="chat"
            className="w-6 h-6 opacity-70"
          />
        </div>

        {/* Centered content */}
        <div className="flex-grow flex flex-col items-center justify-center px-4 text-center">
          <Image src={assets.logo_icon} alt="logo" className="h-16 w-16 mb-4" />
          <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
          <p className="text-sm mt-2">How can I help you today?</p>

          {/* Centered Message */}
          <div className="mt-6">
            <Message role="user" content="What is Next js" />
          </div>

          <div className="mt-6 w-full max-w-2xl">
            <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>
        </div>

        {/* Footer always at bottom */}
        <p className="text-xs text-gray-500 text-center absolute bottom-4 w-full">
          AI-generated, for reference only
        </p>
      </div>
    </div>
  );
}
