import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${backendURL}/users/all`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // Update role
  const updateRole = async (id, role) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Change role to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${backendURL}/users/role/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire("Success!", "Role updated successfully", "success");
        fetchUsers();
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to update role", "error");
    }
  };

  // Mark vendor as fraud
  const markFraud = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This vendor will be marked as fraud!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, mark fraud",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${backendURL}/users/fraud/${id}`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire("Done!", "Vendor marked as fraud", "success");
        fetchUsers();
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  return (
    <div className="my-10 mx-auto w-11/12 max-w-6xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Manage Users
      </h2>

      {/* Responsive Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white dark:bg-[#1e1e3a] rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition"
          >
            {/* User Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {user.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm mb-2">
                {user.email}
              </p>

              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full
                ${
                  user.role === "admin"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                    : user.role === "vendor"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                }`}
              >
                {user.role.toUpperCase()}
              </span>

              {user.isFraud && (
                <p className="mt-2 text-sm font-semibold text-red-500">
                  🚫 Fraud Vendor
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              {/* Make Admin */}
              <button
                disabled={user.role === "admin"}
                onClick={() => updateRole(user._id, "admin")}
                className={`flex-1 px-3 py-2 rounded-lg text-white text-sm font-semibold
                  ${
                    user.role === "admin"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                Make Admin
              </button>

              {/* Make Vendor */}
              <button
                disabled={user.role === "vendor"}
                onClick={() => updateRole(user._id, "vendor")}
                className={`flex-1 px-3 py-2 rounded-lg text-white text-sm font-semibold
                  ${
                    user.role === "vendor"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
              >
                Make Vendor
              </button>

              {/* Fraud Button (Only Vendor) */}
              {user.role === "vendor" && (
                <button
                  disabled={user.isFraud}
                  onClick={() => markFraud(user._id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-white text-sm font-semibold
                    ${
                      user.isFraud
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                >
                  {user.isFraud ? "Fraud" : "Mark Fraud"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
