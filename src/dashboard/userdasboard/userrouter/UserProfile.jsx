import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p className="text-center text-gray-500 dark:text-gray-300">No user data found.</p>;
  }

  return (
    <div className=" ml-0 sm:ml-20 my-10  p-6 bg-white dark:bg-[#0f0f2a] rounded-2xl shadow-md  dark:border-gray-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-32 h-32 rounded-full border-4 border-[#FEBC00] dark:border-[#2C9CE5] object-cover"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{user.displayName}</h1>
          <p className="text-gray-600 dark:text-gray-300">{user.role}</p>
        </div>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoCard icon={<FiMail />} label="Email" value={user.email} />
        <InfoCard icon={<FiPhone />} label="Phone" value={user.phone} />
        <InfoCard icon={<FiMapPin />} label="Address" value={user.address} />
        <InfoCard icon={<FiUser />} label="Hobbies" value={user.hobbies} />
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 bg-[#FEBC00]/10 dark:bg-[#2C9CE5]/10 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition">
    <div className="p-3 bg-[#FEBC00] dark:bg-[#2C9CE5] text-white rounded-xl text-2xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
      <p className="font-semibold text-gray-800 dark:text-white">{value}</p>
    </div>
  </div>
);

export default UserProfile;
