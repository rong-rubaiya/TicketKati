import React, { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${backendURL}/users/all`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await fetch(`${backendURL}/users/role/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const markFraud = async (id) => {
    try {
      await fetch(`${backendURL}/users/fraud/${id}`, { method: "PATCH" });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-10 mx-auto w-11/12 max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Manage Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white dark:bg-[#1e1e3a] rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{user.name}</h3>
              <p className="text-gray-500 dark:text-gray-300 mb-2">{user.email}</p>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  user.role === "admin"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                    : user.role === "vendor"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                }`}>
                {user.role.toUpperCase()}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="flex-1 px-3 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition" onClick={() => updateRole(user._id, 'admin')}>Make Admin</button>
              <button className="flex-1 px-3 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition" onClick={() => updateRole(user._id, 'vendor')}>Make Vendor</button>
              {user.role === "vendor" && (
                <button className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition" onClick={() => markFraud(user._id)}>Mark as Fraud</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
