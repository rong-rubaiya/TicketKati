import React, { useContext, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";

const Setting = () => {
  const { user, updateUserProfile, updateExtraProfile, resetPassword } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [emailNotifications, setEmailNotifications] = useState(user?.emailNotifications || false);
  const [smsNotifications, setSmsNotifications] = useState(user?.smsNotifications || false);
  const [passwordEmail, setPasswordEmail] = useState("");

  const handleProfileUpdate = async () => {
    try {
      await updateUserProfile(name, photoURL);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        confirmButtonColor: "#ff9900",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile. Try again.",
        confirmButtonColor: "#ff9900",
      });
    }
  };

  const handleExtraUpdate = () => {
    updateExtraProfile({ emailNotifications, smsNotifications });
    Swal.fire({
      icon: "success",
      title: "Settings Saved",
      text: "Notification settings updated successfully!",
      confirmButtonColor: "#ff9900",
    });
  };

  const handlePasswordReset = async () => {
    try {
      await resetPassword(passwordEmail);
      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "Password reset email has been sent!",
        confirmButtonColor: "#ff9900",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to send password reset email.",
        confirmButtonColor: "#ff9900",
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Settings
      </h1>

      <div className="bg-white dark:bg-[#0f0f2a] p-6 rounded-xl shadow-md space-y-6">
        {/* Profile Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Profile Info
          </h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-[#1a1a3a] text-gray-800 dark:text-white"
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-[#1a1a3a] text-gray-800 dark:text-white"
            />
            <button
              onClick={handleProfileUpdate}
              className="bg-[#ff9900] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-all dark:bg-[#2C9CE5]"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Password Reset */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Reset Password
          </h2>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={passwordEmail}
              onChange={(e) => setPasswordEmail(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-[#1a1a3a] text-gray-800 dark:text-white"
            />
            <button
              onClick={handlePasswordReset}
              className="bg-[#ff9900] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-all dark:bg-[#2C9CE5]"
            >
              Send Reset Email
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Notifications
          </h2>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 accent-[#ff9900] dark:accent-[#2C9CE5]"
              />
              <span className="text-gray-800 dark:text-white">Email Notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={smsNotifications}
                onChange={(e) => setSmsNotifications(e.target.checked)}
                className="w-4 h-4 accent-[#ff9900] dark:accent-[#2C9CE5]"
              />
              <span className="text-gray-800 dark:text-white">SMS Notifications</span>
            </label>
            <button
              onClick={handleExtraUpdate}
              className="bg-[#ff9900] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-all dark:bg-[#2C9CE5]"
            >
              Save Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
