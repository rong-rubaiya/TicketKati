import React, { useState } from "react";
import { NavLink } from "react-router";
import {
  FiUser,
  FiClipboard,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiHome,
} from "react-icons/fi";

const Sidebar = ({ currentUser, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/dashboard/user", label: "Dashboard Home", icon: <FiHome /> },
    { path: "/dashboard/user/profile", label: "User Profile", icon: <FiUser /> },
    {
      path: "/dashboard/user/booked-tickets",
      label: "My Booked Tickets",
      icon: <FiClipboard />,
    },
    {
      path: "/dashboard/user/transactions",
      label: "Transaction History",
      icon: <FiCreditCard />,
    },
    { path: "/dashboard/user/settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <>
      {/* Mobile Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed   z-50 bg-[#FEBC00] dark:bg-[#2C9CE5] p-3 rounded-xl shadow-lg"
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar Box */}
      <aside
        className={`
          top-0 pt-6 pb-15 left-0 w-64 bg-white dark:bg-[#00114b] shadow-xl border-r border-gray-300 dark:border-gray-700
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          z-40
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 text-2xl font-extrabold tracking-wider text-[#ff9900] dark:text-[#FEBC00]">
            TicketKati
          </div>

          {/* MENU LIST */}
          <ul className="flex-1 px-4 flex flex-col gap-2">
            {links.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl text-[15px] font-semibold transition-all
                  ${
                    isActive
                      ? "bg-[#FEBC00]/30 dark:bg-[#2C9CE5]/40 text-[#ff9900] dark:text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-[#ffdf89]/40 dark:hover:bg-[#2C9CE5]/20"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </ul>

          {/* Logout */}
          {currentUser && (
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white p-3 rounded-xl font-bold hover:bg-red-600 transition-all"
              >
                <FiLogOut className="text-lg" /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Backdrop (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT PUSH — prevents footer overlap */}
      <div className="md:ml-64"></div>
    </>
  );
};

export default Sidebar;
