import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import jsPDF from "jspdf";

const Transection = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/transactions/${user.email}`
        );
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to load transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user?.email]);

  // ================= PDF Download Function =================
  const downloadPDF = (txn) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // Title
    pdf.setFontSize(22);
    pdf.setTextColor("#FEBC00"); // light theme color
    pdf.text("Ticket", 210, 50, { align: "center" });

    // Ticket details
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Transaction ID: ${txn.transactionId}`, 40, 100);
    pdf.text(`Ticket: ${txn.ticketTitle}`, 40, 130);
    pdf.text(`Amount: $${txn.amount}`, 40, 160);
    pdf.text(`Payment Date: ${new Date(txn.paymentDate).toLocaleString()}`, 40, 190);

    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text("Powered by TicketKati", 210, 800, { align: "center" });

    pdf.save(`${txn.ticketTitle}_ticket.pdf`);
  };

  if (loading)
    return (
      <p className="text-center mt-24 text-gray-500 dark:text-gray-300">
        Loading transactions...
      </p>
    );

  if (!transactions.length)
    return (
      <p className="text-center mt-24 text-gray-500 dark:text-gray-300">
        No transactions found.
      </p>
    );

  return (
    <div className="py-10 px-6 transition-colors">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#FEBC00] dark:text-[#2C9CE5]">
        My Payment History
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg border border-[#FEBC00]/30 dark:border-[#2C9CE5]/30">
        <table className="min-w-full bg-white dark:bg-[#00138e]/40 backdrop-blur-lg">
          <thead className="bg-[#FEBC00]/20 dark:bg-[#2C9CE5]/20">
            <tr>
              <th className="px-6 py-4 text-left font-bold text-gray-800 dark:text-white">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-left font-bold text-gray-800 dark:text-white">
                Amount ($)
              </th>
              <th className="px-6 py-4 text-left font-bold text-gray-800 dark:text-white">
                Ticket
              </th>
              <th className="px-6 py-4 text-left font-bold text-gray-800 dark:text-white">
                Payment Date
              </th>
              <th className="px-6 py-4 text-left font-bold text-gray-800 dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.transactionId}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-[#FEBC00]/10 dark:hover:bg-[#2C9CE5]/10 transition"
              >
                <td className="px-6 py-4 font-mono text-sm text-gray-700 dark:text-gray-200">
                  {txn.transactionId}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">
                  ${txn.amount}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                  {txn.ticketTitle}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {new Date(txn.paymentDate).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => downloadPDF(txn)}
                    className="bg-[#FEBC00] dark:bg-[#2C9CE5] hover:bg-[#ffdf89] dark:hover:bg-[#3aa0ff] text-black dark:text-white font-bold py-1 px-3 rounded transition"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {transactions.map((txn) => (
          <div
            key={txn.transactionId}
            className="bg-white dark:bg-[#00138e]/40 backdrop-blur-lg rounded-2xl p-4 shadow-md border border-[#FEBC00]/30 dark:border-[#2C9CE5]/30"
          >
            <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
              Transaction ID
            </p>
            <p className="font-mono text-sm break-all text-gray-800 dark:text-white">
              {txn.transactionId}
            </p>

            <div className="mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-300">Amount</p>
              <p className="font-bold text-gray-800 dark:text-white">
                ${txn.amount}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-300">Ticket</p>
              <p className="text-gray-700 dark:text-gray-200">
                {txn.ticketTitle}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Payment Date
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {new Date(txn.paymentDate).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => downloadPDF(txn)}
              className="mt-3 bg-[#FEBC00] dark:bg-[#2C9CE5] hover:bg-[#ffdf89] dark:hover:bg-[#3aa0ff] text-black dark:text-white font-bold py-1 px-3 rounded transition w-full"
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transection;
