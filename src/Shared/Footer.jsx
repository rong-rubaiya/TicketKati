import React from "react";
import { FaFacebookF, FaStripe } from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="bg-[#ff9900] dark:bg-[#080808] text-black dark:text-white relative overflow-hidden">
      
      <div className="w-11/12 mx-auto py-16 grid md:grid-cols-4 gap-10">
      
        {/* Column 1: Logo + Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl font-bold">✈️</div>
            <h2 className="font-bold text-2xl">TicketKati</h2>
          </div>
          <p className="text-sm md:text-base">
            Book bus, train, launch & flight tickets easily.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/tickets" className="hover:underline">All Tickets</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="font-bold text-lg mb-4">Contact Info</h3>
          <p className="text-sm mb-2">✉️ support@ticketkati.com</p>
          <p className="text-sm mb-2">📞 +880 1234 567 890</p>
          <p className="text-sm mb-2 flex items-center gap-2">
            <FaFacebookF /> <span>Facebook Page</span>
          </p>
        </div>

        {/* Column 4: Payment Methods */}
        <div>
          <h3 className="font-bold text-lg mb-4">Payment Methods</h3>
          <div className="flex items-center gap-4">
            {/* Example: Stripe */}
            <FaStripe className="text-3xl hover:text-[#FEBC00] transition-colors duration-300" />
            {/* You can add more payment icons here */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-11/12 mx-auto border-t border-black/20 dark:border-white/20 pt-4 text-center text-sm md:text-base">
        © 2025 TicketKati. All rights reserved.
      </div>
      
    </footer>
  );
};

export default Footer;
