import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueOverview = () => {
  const summary = [
    { title: "Total Revenue", value: "৳ 1,25,000" },
    { title: "Total Tickets Sold", value: "320" },
    { title: "Total Tickets Added", value: "45" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 22000 },
    { month: "Apr", revenue: 30000 },
    { month: "May", revenue: 40000 },
  ];

  const ticketData = [
    { name: "Tickets Sold", value: 320 },
    { name: "Tickets Added", value: 45 },
  ];

  return (
    <div className="p-4 sm:p-6  ">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Revenue Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
        {summary.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#0f0f2a] rounded-xl shadow-md p-4 sm:p-6 border dark:border-gray-700"
          >
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300">
              {item.title}
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-white mt-2">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Line Chart */}
        <div className="bg-white dark:bg-[#0f0f2a] p-4 sm:p-5 rounded-xl shadow-md border dark:border-gray-700">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 text-sm sm:text-base">
            Monthly Revenue
          </h3>
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff9900"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tickets Bar Chart */}
        <div className="bg-white dark:bg-[#0f0f2a] p-4 sm:p-5 rounded-xl shadow-md border dark:border-gray-700">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 text-sm sm:text-base">
            Tickets Overview
          </h3>
          <div className="w-full h-64 text-black sm:h-72">
            <ResponsiveContainer width="100%"  height="100%">
              <BarChart data={ticketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2C9CE5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
