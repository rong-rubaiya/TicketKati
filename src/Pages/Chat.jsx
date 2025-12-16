import React, { useState } from "react";

const dummyChats = [
  { id: 1, name: "Vendor: BusExpress", lastMessage: "Your booking has been confirmed!", time: "10:45 AM" },
  { id: 2, name: "Support", lastMessage: "Please provide your booking ID.", time: "09:30 AM" },
  { id: 3, name: "Vendor: SkyAir", lastMessage: "Flight schedule updated.", time: "Yesterday" },
];

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    alert(`Message sent: ${message}`);
    setMessage("");
  };

  return (
    <section className="flex flex-col md:flex-row  max-w-7xl mx-auto shadow-xl rounded-3xl overflow-hidden pt-30 pb-10">
      
      {/* Chat List */}
      <div className="w-full md:w-1/3 bg-white dark:bg-[#121a3a] border-b md:border-b-0 md:border-r border-[#FEBC00]/30 dark:border-[#2C9CE5]/30 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 p-4 border-b border-[#FEBC00]/30 dark:border-[#2C9CE5]/30 sticky top-0 bg-white dark:bg-[#121a3a] z-10">
          Chats
        </h2>
        <ul className="p-2">
          {dummyChats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-3 mb-2 cursor-pointer rounded-lg transition-all ${
                selectedChat.id === chat.id
                  ? "bg-[#FEBC00]/30 dark:bg-[#2C9CE5]/40 font-semibold scale-105"
                  : "hover:bg-[#FEBC00]/10 dark:hover:bg-[#2C9CE5]/20"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">{chat.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-300">{chat.time}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm truncate">{chat.lastMessage}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-full md:w-2/3 flex flex-col justify-between bg-[#fff8e7] dark:bg-[#111733]">
        
        {/* Messages */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-[#FEBC00]/50 dark:scrollbar-thumb-[#2C9CE5]/50 scrollbar-track-transparent">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 sticky top-0 bg-[#fff8e7] dark:bg-[#111733] py-2 z-10 border-b border-[#FEBC00]/20 dark:border-[#2C9CE5]/20">
            {selectedChat.name}
          </h3>

          <Message sender="other" text={selectedChat.lastMessage} />
          <Message sender="me" text="Thanks! Got it." />
          <Message sender="other" text="Do you need any assistance with booking?" />
        </div>

        {/* Input */}
        <div className="p-3 md:p-4 border-t border-[#FEBC00]/30 dark:border-[#2C9CE5]/30 flex gap-2 bg-white dark:bg-[#121a3a]">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-3 rounded-3xl border border-[#FEBC00]/30 dark:border-[#2C9CE5]/30 bg-gray-50 dark:bg-[#1a1a3a] text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FEBC00]/50 dark:focus:ring-[#2C9CE5]/50 transition"
          />
          <button
            onClick={handleSend}
            className="px-1 sm:px-5 py-3 rounded-3xl bg-[#FEBC00] dark:bg-[#2C9CE5] text-black font-semibold hover:bg-[#ffdf89] dark:hover:bg-[#55b7f0] transition"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

const Message = ({ sender, text }) => (
  <div
    className={`max-w-[70%] p-3 md:p-4 rounded-3xl shadow-sm ${
      sender === "me"
        ? "bg-[#FEBC00]/50 dark:bg-[#2C9CE5]/50 self-end text-black"
        : "bg-white dark:bg-[#1a1a3a] text-gray-900 dark:text-gray-100"
    }`}
  >
    {text}
  </div>
);

export default Chat;
