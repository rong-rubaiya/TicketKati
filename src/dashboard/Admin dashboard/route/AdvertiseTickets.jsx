import React from "react";

const AdvertiseTickets = () => {
  // Sample ticket data
  const tickets = [
    { id: 1, title: "Dhaka → Chittagong", vendor: "Arafat Travels", price: 1200, advertised: false },
    { id: 2, title: "Dhaka → Sylhet", vendor: "Nusrat Travels", price: 1500, advertised: true },
    { id: 3, title: "Dhaka → Rajshahi", vendor: "Rakib Travels", price: 1100, advertised: false },
  ];

  return (
    <div className="my-10 mx-auto w-11/12 max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Advertise Tickets
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-[#1e1e3a] rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left">Ticket</th>
              <th className="px-4 py-3 text-left">Vendor</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Advertise</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#12123a]">
                <td className="px-4 py-3">{ticket.title}</td>
                <td className="px-4 py-3">{ticket.vendor}</td>
                <td className="px-4 py-3 text-center font-semibold">৳ {ticket.price}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    className={`px-4 py-1 rounded-full font-semibold text-white transition ${
                      ticket.advertised ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {ticket.advertised ? "Unadvertise" : "Advertise"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Note: You cannot advertise more than 6 tickets at a time.
      </p>
    </div>
  );
};

export default AdvertiseTickets;
