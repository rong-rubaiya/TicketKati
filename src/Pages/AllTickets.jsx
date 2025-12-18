import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const AllTickets = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(user)

  const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
   

    fetch(`${backendURL}/all-tickets`
    )
      .then(res => res.json())
      .then(data => {
        setTickets(data.filter(ticket => ticket.approved === true));
        setLoading(false);
        console.log(data)
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [backendURL, user]);

  if (loading) {
    return <p className="text-center pt-30">Loading tickets...</p>;
  }

  return (
    <div className="py-28 w-11/12 max-w-7xl mx-auto">
      <h2 className="text-3xl text-center font-bold mb-8">All Tickets</h2>

      {tickets.length === 0 && (
        <p className="text-center text-gray-500">
          No approved tickets available.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tickets.map(ticket => (
          <div key={ticket._id} className="rounded-2xl shadow bg-white">
            <img
               src={ticket.image || "/images/placeholder.jpg"}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">{ticket.title}</h3>
              <p>{ticket.from} → {ticket.to}</p>
              <p>Transport: {ticket.transportType}</p>
              <p>Price: ৳{ticket.price}</p>

             <Link to={`/ticket/${ticket._id}`}>
  <button className="mt-4 w-full bg-yellow-400 py-2 rounded-xl">
    See Details
  </button>
</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
