import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";

const AddTicket = () => {
  const { user } = useContext(AuthContext);
  const [perks, setPerks] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
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
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageUrl(data.data.url);
      Swal.fire({
        icon: "success",
        title: "Image uploaded successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Image upload failed",
      });
    } finally {
      setUploading(false);
    }
  };

  // Submit ticket form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!imageUrl) {
      Swal.fire({
        icon: "warning",
        title: "Please upload an image first!",
      });
      return;
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
      verificationStatus: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Ticket added successfully",
          text: "Pending approval by admin",
        });
        form.reset();
        setPerks([]);
        setImageUrl("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add ticket",
          text: data.error || "Unknown error",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to add ticket",
      });
    }
  };

  return (
    <div className="ml-0 sm:ml-20 my-10 p-6 bg-white dark:bg-[#0f0f2a] rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Add New Ticket
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input name="title" placeholder="Ticket Title" className="input" required />
        <input name="from" placeholder="From (Location)" className="input" required />
        <input name="to" placeholder="To (Location)" className="input" required />
        <select name="transport" className="input" required>
          <option value="">Select Transport</option>
          <option>Bus</option>
          <option>Train</option>
          <option>Air</option>
          <option>Launch</option>
        </select>
        <input name="price" type="number" placeholder="Price per unit" className="input" required />
        <input name="quantity" type="number" placeholder="Ticket Quantity" className="input" required min={0} />
        <input name="date" type="date" className="input" required />
        <input name="time" type="time" className="input" required />

        <div className="col-span-full">
          <p className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Perks</p>
          <div className="flex flex-wrap gap-4">
            {["AC", "Breakfast", "WiFi", "Charging"].map((perk) => (
              <label key={perk} className="flex items-center gap-2">
                <input type="checkbox" onChange={() => handlePerksChange(perk)} />
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
