import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import Swal from "sweetalert2";

const blogPosts = [
  {
    id: 1,
    title: "Top Tips for Hassle-Free Ticket Booking",
    category: "Travel",
    excerpt: "Learn how to book tickets quickly and securely with TicketKati.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 2,
    title: "Why Choose Verified Vendors?",
    category: "Platform",
    excerpt: "Understand the importance of choosing verified vendors for your travel bookings.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 3,
    title: "Travel Safety During Peak Seasons",
    category: "Safety",
    excerpt: "Discover essential travel safety tips and precautions for a smooth journey.",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 4,
    title: "Booking Tickets on Mobile App",
    category: "Mobile",
    excerpt: "Quick guide to booking tickets on the TicketKati app with ease.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
];

const Blogs = () => {
  const pathname = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handlePremiumAlert = () => {
    Swal.fire({
      title: "Premium Feature",
      text: "You must be a premium member to access this content!",
      icon: "info",
      confirmButtonText: "OK",
      confirmButtonColor: "#FEBC00",
    });
  };

  return (
    <section className="py-28  w-11/12 mx-auto">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            TicketKati
            <span className="block text-[#FEBC00]">Blog</span>
          </h1>
          <nav className="flex flex-wrap space-x-4 text-blue-300 mt-4 md:mt-0">
            {["Latest", "Tips", "Travel", "Safety", "Mobile"].map((cat, idx) => (
              <button
                key={idx}
                onClick={handlePremiumAlert}
                className="hover:text-[#FF9900] font-semibold transition"
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Featured Post */}
        <div className="bg-white dark:bg-[#121a3a] rounded-2xl shadow-lg overflow-hidden mb-8 border border-[#FEBC00]/40">
          <img src={blogPosts[0].image} alt={blogPosts[0].title} className="w-full h-72 object-cover"/>
          <div className="p-6">
            <span className="text-sm text-[#FEBC00] font-semibold">{blogPosts[0].category}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{blogPosts[0].title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{blogPosts[0].excerpt}</p>
            <button
              onClick={handlePremiumAlert}
              className="mt-4 px-6 py-2 rounded-full bg-[#FEBC00] text-black font-semibold hover:bg-[#ffdf89] transition"
            >
              Read More →
            </button>
          </div>
        </div>

        {/* Other Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map(post => (
            <div key={post.id} className="bg-white dark:bg-[#121a3a] rounded-2xl shadow-lg overflow-hidden border border-[#FEBC00]/40">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <span className="text-sm text-[#FEBC00] font-semibold">{post.category}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 line-clamp-3">{post.excerpt}</p>
                <button
                  onClick={handlePremiumAlert}
                  className="mt-2 inline-block px-4 py-1 rounded-full bg-[#FEBC00] text-black font-semibold hover:bg-[#ffdf89] transition"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blogs;
