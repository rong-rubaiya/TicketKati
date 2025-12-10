import React from "react";

const Transection = () => {
  // Sample transaction data
  const transactions = [
    {
      id: "txn_1N8AbCDeFGHIJKL",
      amount: 2500,
      ticketTitle: "Dhaka → Chittagong",
      paymentDate: "2025-12-01 10:15 AM",
    },
    {
      id: "txn_2N8AbCDeFGHIJKL",
      amount: 1500,
      ticketTitle: "Dhaka → Sylhet",
      paymentDate: "2025-12-03 02:45 PM",
    },
    {
      id: "txn_3N8AbCDeFGHIJKL",
      amount: 3300,
      ticketTitle: "Dhaka → Khulna",
      paymentDate: "2025-12-05 06:30 PM",
    },
    {
      id: "txn_4N8AbCDeFGHIJKL",
      amount: 1300,
      ticketTitle: "Dhaka → Rajshahi",
      paymentDate: "2025-12-07 09:00 AM",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        My Stripe Transactions
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-[#0f0f2a] rounded-lg shadow-md">
          <thead className="bg-[#ff9900]/20 dark:bg-[#2C9CE5]/20 text-gray-800 dark:text-white">
            <tr>
              <th className="py-3 px-6 text-left">Transaction ID</th>
              <th className="py-3 px-6 text-left">Amount (৳)</th>
              <th className="py-3 px-6 text-left">Ticket Title</th>
              <th className="py-3 px-6 text-left">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-[#ff9900]/10 dark:hover:bg-[#2C9CE5]/10 transition-colors"
              >
                <td className="py-3 px-6">{txn.id}</td>
                <td className="py-3 px-6 font-semibold">৳ {txn.amount}</td>
                <td className="py-3 px-6">{txn.ticketTitle}</td>
                <td className="py-3 px-6">{txn.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transection;
