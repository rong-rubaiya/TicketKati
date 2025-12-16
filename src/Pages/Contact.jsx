import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="relative overflow-hidden bg-[#fffdf7] dark:bg-[#0b1020] py-30">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            Get in Touch
            <span className="block text-[#ff9900]">TicketKati</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question or need help? Fill out the form below or reach us through our social platforms.
          </p>
        </div>

        {/* Form + Map + Social Links */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Contact Form */}
          <form className="bg-white dark:bg-[#121a3a] rounded-3xl p-10 shadow-lg border border-[#FEBC00]/40 space-y-6">
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-[#FEBC00] dark:border-[#2C9CE5] bg-white dark:bg-[#0b1020] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FEBC00]/50"
              />
            </div>
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl border border-[#FEBC00] dark:border-[#2C9CE5] bg-white dark:bg-[#0b1020] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FEBC00]/50"
              />
            </div>
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl border border-[#FEBC00] dark:border-[#2C9CE5] bg-white dark:bg-[#0b1020] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FEBC00]/50"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#FEBC00] hover:bg-[#ffdf89] dark:bg-[#2C9CE5] dark:hover:bg-[#4db3ff] text-black font-bold transition"
            >
              Send Message
            </button>
          </form>

          {/* Map + Social Links */}
          <div className="space-y-8">
            {/* Social */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Follow Us</h3>
              <div className="flex gap-6">
                <SocialIcon icon={<FaFacebookF />} link="#" />
                <SocialIcon icon={<FaTwitter />} link="#" />
                <SocialIcon icon={<FaInstagram />} link="#" />
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-80 rounded-2xl overflow-hidden border border-[#FEBC00]/40 shadow-lg">
              <iframe
                title="Bangladesh Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9020168205343!2d90.35633177449354!3d23.68501408456051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7f4030fa0a1%3A0x8c85732cb8049182!2sBangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ---------- Social Icon ---------- */
const SocialIcon = ({ icon, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer"
    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FEBC00] dark:bg-[#2C9CE5] text-black hover:scale-110 transition"
  >
    {icon}
  </a>
);

export default Contact;
