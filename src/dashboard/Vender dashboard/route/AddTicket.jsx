import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

const AddTicket = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const ticketToEdit = location.state?.ticket;

  const [perks, setPerks] = useState(ticketToEdit?.perks || []);
  const [imageUrl, setImageUrl] = useState(ticketToEdit?.image || "");
  const [uploading, setUploading] = useState(false);

  // Handle checkbox perks
  const handlePerksChange = (perk) => {
    if (perks.includes(perk)) setPerks(perks.filter(p => p !== perk));
    else setPerks([...perks, perk]);
  };

  // Image upload to imgbb
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_APP}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setImageUrl(data.data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Submit form for Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!imageUrl) {
      return alert("Please upload an image first!");
    }

    const ticketData = {
      title: form.title.value,
      from: form.from.value,
      to: form.to.value,
      transportType: form.transport.value,
      price: parseFloat(form.price.value),
      quantity: parseInt(form.quantity.value),
      departureDate: form.date.value,
      departureTime: form.time.value,
      departureDateTime: new Date(`${form.date.value}T${form.time.value}`),
      perks,
      image: imageUrl,
      vendorName: user.displayName,
      vendorEmail: user.email,
      verificationStatus: ticketToEdit ? ticketToEdit.verificationStatus : "pending",
      createdAt: ticketToEdit ? ticketToEdit.createdAt : new Date(),
    };

    try {
      let res;
      if (ticketToEdit) {
        // Update existing ticket
        res = await fetch(`https://ticketkati.vercel.app/tickets/${ticketToEdit._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ticketData),
        });
      } else {
        // Add new ticket
        res = await fetch(`https://ticketkati.vercel.app/tickets`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ticketData),
        });
      }

      const data = await res.json();

      if (data.success) {
        navigate("/dashboard/vendor/my-tickets"); // back to MyAddedTickets
      } else {
        console.error("Error:", data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ml-0 sm:ml-20 my-10 p-6 bg-white dark:bg-[#0f0f2a] rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {ticketToEdit ? "Update Ticket" : "Add New Ticket"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input name="title" defaultValue={ticketToEdit?.title} placeholder="Ticket Title" className="input" required />
        <input name="from" defaultValue={ticketToEdit?.from} placeholder="From (Location)" className="input" required />
        <input name="to" defaultValue={ticketToEdit?.to} placeholder="To (Location)" className="input" required />
        <select name="transport" defaultValue={ticketToEdit?.transportType} className="input" required>
          <option value="">Select Transport</option>
          <option>Bus</option>
          <option>Train</option>
          <option>Air</option>
          <option>Launch</option>
        </select>
        <input name="price" type="number" defaultValue={ticketToEdit?.price} placeholder="Price per unit" className="input" required />
        <input name="quantity" type="number" defaultValue={ticketToEdit?.quantity} placeholder="Ticket Quantity" className="input" required min={0} />
        <input name="date" type="date" defaultValue={ticketToEdit ? ticketToEdit.departureDateTime.split("T")[0] : ""} className="input" required />
        <input name="time" type="time" defaultValue={ticketToEdit ? ticketToEdit.departureDateTime.split("T")[1].slice(0,5) : ""} className="input" required />

        <div className="col-span-full">
          <p className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Perks</p>
          <div className="flex flex-wrap gap-4">
            {["AC", "Breakfast", "WiFi", "Charging"].map((perk) => (
              <label key={perk} className="flex items-center gap-2">
                <input type="checkbox" checked={perks.includes(perk)} onChange={() => handlePerksChange(perk)} />
                {perk}
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-full">
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Ticket Image
          </label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-gray-500 mt-2">Uploading image...</p>}
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="mt-4 w-40 h-28 object-cover rounded-lg border" />
          )}
        </div>

        <input value={user.displayName} readOnly className="input bg-gray-100 text-black" />
        <input value={user.email} readOnly className="input bg-gray-100 text-black" />

        <button type="submit" className="col-span-full bg-[#FEBC00] hover:bg-[#e6a900] text-black font-bold py-3 rounded-xl transition">
          {ticketToEdit ? "Update Ticket" : "Add Ticket"}
        </button>
      </form>
    </div>
  );
};

export default AddTicket;
