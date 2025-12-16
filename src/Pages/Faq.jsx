import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Faq = () => {
  const faqs = [
    {
      question: "How can I book a ticket?",
      answer:
        "You can book tickets by searching for your route, selecting a schedule, and completing a secure payment through our platform.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major debit/credit cards, mobile banking, and secure online wallets to make your payment experience safe and convenient.",
    },
    {
      question: "Can I cancel or reschedule my ticket?",
      answer:
        "Yes, you can cancel or reschedule tickets based on the vendor's policy. Make sure to check the terms before confirming your booking.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Absolutely! We use industry-standard encryption and security practices to protect all your personal and payment information.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach our support team via the Contact page, email, or our social media channels. We respond promptly to all queries.",
    },
  ];

  return (
    <section className="relative bg-[#fffdf7] dark:bg-[#0b1020] py-32 overflow-hidden">
      {/* ================= Animated Big Question Marks ================= */}
      {[...Array(6)].map((_, idx) => (
        <FloatingQuestionMark
          key={idx}
          size={50 + Math.random() * 100} // Random big sizes
          x={Math.random() * 90}
          y={Math.random() * 90}
          duration={5 + Math.random() * 5}
        />
      ))}

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            Frequently Asked
            <span className="block text-[#ff9900]">Questions</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Find answers to common questions about TicketKati. Still unsure? Contact us directly.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <Accordion key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Contact Button */}
        <div className="text-center mt-14">
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-full bg-[#FEBC00] text-black font-bold shadow-xl hover:bg-[#ffdf89] transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ---------- Accordion Component ---------- */
const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ borderRadius: "1rem" }}
      className="bg-white dark:bg-[#121a3a] rounded-3xl shadow-xl border border-[#FEBC00]/40 overflow-hidden hover:scale-105 transition-transform"
    >
      <button
        className="w-full flex justify-between items-center px-6 py-5 text-gray-900 dark:text-gray-100 font-semibold text-lg hover:bg-[#FEBC00]/10 dark:hover:bg-[#2C9CE5]/10 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-6 py-4 text-gray-700 dark:text-gray-300 border-t border-[#FEBC00]/20"
        >
          {answer}
        </motion.div>
      )}
    </motion.div>
  );
};

/* ---------- Floating Question Mark Component ---------- */
const FloatingQuestionMark = ({ x, y, size, duration }) => {
  return (
    <motion.div
      className="absolute text-[#FEBC00] dark:text-[#2C9CE5] font-black select-none"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: `${size}px` }}
      animate={{ y: [y, y - 50, y], rotate: [0, 15, -15, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      ?
    </motion.div>
  );
};

export default Faq;
