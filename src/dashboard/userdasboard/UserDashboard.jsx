import React from "react";
import Sidebar from "./sidebar/Sidebar";

const UserDashboard = () => {
  return (
    <div className="flex pt-22">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 md:ml-64 p-6 ">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome to User Dashboard
        </h2>

        {/* Your content will go here */}
      </div>
    </div>
  );
};

export default UserDashboard;
