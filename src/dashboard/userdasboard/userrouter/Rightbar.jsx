import React from "react";
import { FiClock, FiCreditCard, FiPackage, FiUser } from "react-icons/fi";

const Rightbar = () => {
  return (
    <div className="p-4 sm:p-6">
      {/* TITLE */}
      <h1 className="text-2xl text-center font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Overview
      </h1>

      {/* STAT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        <StatCard
          icon={<FiPackage />}
          title="Booked Tickets"
          value="12"
          lightBg="bg-[#FEBC00]/30"
          lightText="text-[#FEBC00]"
          darkBg="bg-[#ffeb99]/30"
          darkText="text-[#ffeb99]"
        />

        <StatCard
          icon={<FiCreditCard />}
          title="Total Spent"
          value="৳ 4,250"
          lightBg="bg-[#2C9CE5]/30"
          lightText="text-[#2C9CE5]"
          darkBg="bg-[#2c66b2]/30"
          darkText="text-[#2C9CE5]"
        />

        <StatCard
          icon={<FiClock />}
          title="Upcoming Trips"
          value="3"
          lightBg="bg-green-100"
          lightText="text-green-600"
          darkBg="bg-green-800/20"
          darkText="text-green-400"
        />

        <StatCard
          icon={<FiUser />}
          title="Your Role"
          value="User"
          lightBg="bg-purple-100"
          lightText="text-purple-600"
          darkBg="bg-purple-800/20"
          darkText="text-purple-400"
        />
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white dark:bg-[#0f0f2a] rounded-2xl p-6 shadow-sm border dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Recent Activity
        </h2>

        <Activity text="Booked a ticket Dhaka → Chittagong" time="2 hours ago" />
        <Activity text="Completed payment ৳420" time="Yesterday" />
        <Activity text="Updated profile picture" time="Last week" />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, lightBg, lightText, darkBg, darkText }) => (
  <div className="bg-white dark:bg-[#0f0f2a] border rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center gap-4">
    <div className={`p-4 rounded-xl text-2xl ${lightBg} ${lightText} dark:${darkBg} dark:${darkText}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 dark:text-gray-300 text-sm">{title}</p>
      <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
    </div>
  </div>
);

const Activity = ({ text, time }) => (
  <div className="py-3 border-b last:border-0 border-gray-200 dark:border-gray-700">
    <p className="font-medium text-gray-800 dark:text-gray-100">{text}</p>
    <p className="text-gray-500 dark:text-gray-400 text-sm">{time}</p>
  </div>
);

export default Rightbar;
