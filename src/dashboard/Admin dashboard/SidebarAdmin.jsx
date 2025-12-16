import React, { useState } from "react";
import { NavLink } from "react-router";
import { 
  FiUser, 
  FiList, 
  FiUsers, 
  FiShoppingCart, 
  FiMenu, 
  FiX 
} from "react-icons/fi";

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/dashboard/admin/profile", label: "Admin Profile", icon: <FiUser /> },
    { path: "/dashboard/admin/manage-tickets", label: "Manage Tickets", icon: <FiList /> },
    { path: "/dashboard/admin/manage-users", label: "Manage Users", icon: <FiUsers /> },
    { path: "/dashboard/admin/advertise-tickets", label: "Advertise Tickets", icon: <FiShoppingCart /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed z-50 bg-[#FEBC00] p-3 mt-24 rounded-xl shadow-lg"
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white dark:bg-[#00114b] shadow-xl border-r border-gray-300 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          z-40
        `}
      >
        <div className="flex flex-col h-full pt-20">
          {/* Logo */}
          <div className="p-6 text-2xl font-extrabold tracking-wider text-[#ff9900] dark:text-[#FEBC00]">
            Admin Panel
          </div>

          {/* Links */}
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

         
        </div>
      </aside>

      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/70 z-30 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Push content */}
      <div className="md:ml-64"></div>
    </>
  );
};

export default SidebarAdmin;
