import React from "react";
import { FaUser, FaBus } from "react-icons/fa";

const Terms = () => {
  return (
    <section className="bg-[#fffdf7] dark:bg-[#0b1020] min-h-screen py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            Terms & <span className="text-[#FEBC00] dark:text-[#2C9CE5]">Conditions</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl">
            Please read these terms carefully before using the TicketKati platform. Separate rules apply for users and vendors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* ================= USER TERMS ================= */}
          <div className="bg-white dark:bg-[#121a3a] p-6 md:p-10 rounded-3xl shadow-lg border border-[#FEBC00]/30 dark:border-[#2C9CE5]/30 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <FaUser className="text-4xl text-[#FEBC00] dark:text-[#2C9CE5]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">User Terms</h2>
            </div>

            <div className="overflow-y-auto h-72 pr-2">
              <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                <li>✅ <strong>Account Usage:</strong> Users must create a valid account to book tickets. You are responsible for all activities under your account.</li>
                <li>✅ <strong>Booking & Payments:</strong> All bookings must be made through TicketKati. Payments are processed securely via trusted gateways.</li>
                <li>✅ <strong>Refunds & Cancellations:</strong> Refunds depend on the vendor’s policy. Check vendor terms before booking.</li>
                <li>✅ <strong>Privacy:</strong> User information is protected and handled according to our Privacy Policy.</li>
                <li>✅ <strong>Conduct:</strong> Users must act responsibly and not misuse the platform or communicate inappropriately with vendors.</li>
                <li>✅ <strong>Support:</strong> Users can reach our support team via the Contact Page or email for any assistance.</li>
              </ul>
            </div>
          </div>

          {/* ================= VENDOR TERMS ================= */}
          <div className="bg-white dark:bg-[#121a3a] p-6 md:p-10 rounded-3xl shadow-lg border border-[#FEBC00]/30 dark:border-[#2C9CE5]/30 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <FaBus className="text-4xl text-[#FEBC00] dark:text-[#2C9CE5]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Vendor Terms</h2>
            </div>

            <div className="overflow-y-auto h-72 pr-2">
              <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                <li>✅ <strong>Account Verification:</strong> Vendors must provide valid documents for verification before listing tickets.</li>
                <li>✅ <strong>Listing Tickets:</strong> Vendors are responsible for providing accurate schedules, fares, and ticket availability.</li>
                <li>✅ <strong>Payments & Fees:</strong> Vendors receive payments securely via TicketKati. Platform fees apply as per subscription or listing plan.</li>
                <li>✅ <strong>Cancellation Policy:</strong> Vendors must clearly communicate refund and cancellation policies to users.</li>
                <li>✅ <strong>Conduct & Compliance:</strong> Vendors must comply with local regulations, provide safe services, and not engage in fraudulent practices.</li>
                <li>✅ <strong>Support:</strong> Vendors can contact our support team for assistance regarding payments or listings.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* ================= CTA ================= */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
            Have questions? Reach out to our support via the{" "}
            <a 
              href="/contact" 
              className="underline text-[#FEBC00] dark:text-[#2C9CE5] font-semibold hover:opacity-80 transition"
            >
              Contact Page
            </a>.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Terms;
