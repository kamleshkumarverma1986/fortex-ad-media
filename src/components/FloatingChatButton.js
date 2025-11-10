"use client";
import { RiWhatsappFill } from "react-icons/ri";
import { useState } from "react";

export default function FloatingChatButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-right-2 duration-200">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-2xl whitespace-nowrap text-sm font-medium">
            Chat with us on WhatsApp
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="border-8 border-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        {/* Pulse Animation Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-ping opacity-20"></div>

        {/* Button as Link */}
        <a
          href="https://api.whatsapp.com/send?phone=+15558610964&text=👋 Hey, I want to know more about your service."
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
        >
          <RiWhatsappFill className="text-3xl" />
        </a>
      </div>
    </div>
  );
}
