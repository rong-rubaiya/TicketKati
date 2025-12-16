import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const AddTicket = () => {
  const { user } = useContext(AuthContext);

  const [perks, setPerks] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handlePerksChange = (perk) => {
    if (perks.includes(perk)) {
      setPerks(perks.filter((p) => p !== perk));
    } else {
      setPerks([...perks, perk]);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setImageUrl(data.data.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const ticketData = {
      title: form.title.value,
      from: form.from.value,
      to: form.to.value,
      transportType: form.transport.value,
      price: parseFloat(form.price.value),
      quantity: parseInt(form.quantity.value),
      departureDate: form.date.value,
      departureTime: form.time.value,
      perks,
      image: imageUrl,
      vendorName: user.displayName,
      vendorEmail: user.email,
      verificationStatus: "pending",
    };

    // save to database
    await fetch("https://your-server.com/tickets", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(ticketData),
    });

    alert("Ticket added successfully (Pending approval)");
    form.reset();
    setPerks([]);
    setImageUrl("");
  };

  return (
    <div className="ml-0 sm:ml-20 my-10 p-6 bg-white dark:bg-[#0f0f2a] rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Add New Ticket
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Ticket Title */}
        <input name="title" placeholder="Ticket Title" className="input" required />

        {/* From & To */}
        <input name="from" placeholder="From (Location)" className="input" required />
        <input name="to" placeholder="To (Location)" className="input" required />

        {/* Transport Type */}
        <select name="transport" className="input" required>
          <option value="">Select Transport</option>
          <option>Bus</option>
          <option>Train</option>
          <option>Air</option>
          <option>Launch</option>
        </select>

        {/* Price */}
        <input name="price" type="number" placeholder="Price per unit" className="input" required />

        {/* Quantity */}
        <input name="quantity" type="number" placeholder="Ticket Quantity" className="input" required />

        {/* Date & Time */}
        <input name="date" type="date" className="input" required />
        <input name="time" type="time" className="input" required />

        {/* Perks */}
        <div className="col-span-full">
          <p className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Perks</p>
          <div className="flex flex-wrap gap-4">
            {["AC", "Breakfast", "WiFi", "Charging"].map((perk) => (
              <label key={perk} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() => handlePerksChange(perk)}
                />
                {perk}
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="col-span-full">
  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
    Ticket Image
  </label>

  <label
    htmlFor="ticketImage"
    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 
    rounded-xl cursor-pointer bg-gray-50 dark:bg-[#0f0f2a] hover:border-[#FEBC00] dark:hover:border-[#2C9CE5] transition"
  >
    <p className="text-sm text-gray-500 dark:text-gray-300">
      Click to upload or drag & drop
    </p>
    <p className="text-xs text-gray-400 mt-1">
      PNG, JPG, JPEG (max 5MB)
    </p>
  </label>

  <input
    id="ticketImage"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
  />

  {/* Preview */}
  {imageUrl && (
    <img
      src={imageUrl}
      alt="Preview"
      className="mt-4 w-40 h-28 object-cover rounded-lg border"
    />
  )}
</div>


        {/* Vendor Info */}
        <input value={user.displayName} readOnly className="input bg-gray-100 text-black" />
        <input value={user.email} readOnly className="input bg-gray-100 text-black" />

        {/* Submit */}
        <button
          type="submit"
          className="col-span-full bg-[#FEBC00] hover:bg-[#e6a900] text-black font-bold py-3 rounded-xl transition"
        >
          Add Ticket
        </button>
      </form>
    </div>
  );
};

export default AddTicket;
