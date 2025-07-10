"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import { createContext, useContext, useState } from "react";
import ChatLabel from "./ChatLabel";


export default function Sidebar({ expand, setExpand }) {

    const {openSignIn} = useClerk();
    const {user} = useAppContext();
    return (
        <div
            className={`h-screen bg-[#202123] text-white px-4 py-6 transition-all duration-300 flex flex-col justify-between ${expand ? "w-64" : "w-16"
                }`}
        >
            {/* Top + Menu Section */}
            <div>
                {/* Top: Logo and toggle button */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        {assets.logo_icon && (
                            <Image src={assets.logo_icon} alt="logo" className="w-8 h-8" />
                        )}
                        {expand && <span className="text-xl font-semibold">DeepSeek</span>}
                    </div>

                    {/* Collapse/Expand Toggle */}
                    {assets.menu_icon && (
                        <button onClick={() => setExpand(!expand)}>
                            <Image
                                src={assets.menu_icon}
                                alt="Toggle"
                                className={`w-5 h-5 transform transition-transform ${!expand ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                    )}
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-4">
                    {/* Chat - styled as blue button */}
                    <SidebarItem
                        icon={assets.chat_icon}
                        label="New Chat"
                        expand={expand}
                        isPrimary={true}
                    />

                    {/* Settings */}
                    <SidebarItem
                        icon={assets.settings_icon}
                        label="Settings"
                        expand={expand}
                    />

                    <div className={`mt-8 text-white/25 text-sm ${expand ? "block" : "hidden"}`}>
                        <p className="my-1">Recents</p>
                        <ChatLabel/>
                    </div>
                </div>
            </div>

            {/* Bottom: Get App */}
            <div>
                <div
                    className={`flex items-center cursor-pointer group relative ${expand
                        ? "gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10"
                        : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"
                        }`}
                >
                    <Image
                        className={expand ? "w-5" : "w-6.5 mx-auto"}
                        src={expand ? assets.phone_icon : assets.phone_icon_dull}
                        alt=""
                    />

                    {/* QR Tooltip */}
                    <div
                        className={`absolute -top-60 pb-8 ${!expand && "-right-40"} opacity-0 
                    group-hover:opacity-100 hidden group-hover:block transition`}
                    >
                        <div className="relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg">
                            <Image src={assets.qrcode} alt="" className="w-44" />
                            <p>Scan to get DeepSeek App</p>
                            <div
                                className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? "right-1/2" : "left-4"}`}
                            ></div>
                        </div>
                    </div>

                    {/* Label + NEW icon */}
                    {expand && (
                        <>
                            <span>Get App</span>
                            <Image alt="" src={assets.new_icon} />
                        </>
                    )}
                </div>

                <div  onClick={ user ? null : openSignIn}
                className={`flex items-center ${expand ? 'hover:bg-white/10 rounded-lg' : 'justify-center w-full'} gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`}>
                    {
                     user ?  <UserButton/>
                     : <Image src={assets.profile_icon} alt='' className="w-7"/>
                    }
                {expand && <span>My Profile</span>}
                </div>
            </div>
        </div>
    );
}

// Reusable item component
function SidebarItem({ icon, label, expand, isPrimary = false }) {
    return (
        <div
            className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${isPrimary
                ? "bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                : "hover:bg-[#383a40]"
                }`}
        >
            {icon && <Image src={icon} alt={label} className="w-5 h-5" />}
            {expand && <span className="text-sm font-medium">{label}</span>}
        </div>
    );
}
