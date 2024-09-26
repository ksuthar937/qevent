"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const initialData = {
  name: "",
  artist: "",
  price: "",
  location: "",
  date: "",
  time: "",
  description: "",
};

const getRandomNumber = (min, max) => {
  let number = Math.random() * (max - min) + min;
  return number.toFixed(0);
};

export default function CreateEvent() {
  const session = useSession();
  const router = useRouter();
  
  const [eventData, setEventData] = useState({
    ...initialData,
  });

  const handleEventCreate = (e) => {
    setEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEventData = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://qevent-backend.labs.crio.do/events", {
        id: uuidv4(),
        name: eventData.name,
        location: eventData.location,
        date: eventData.date,
        time: eventData.time,
        image: `https://randomuser.me/api/portraits/men/${getRandomNumber(
          1,
          99
        )}.jpg`,
        artist: eventData.artist,
        price: eventData.price,
        description: eventData.description,
      });
      router.push("/events");
    } catch (error) {
      alert("Event creation failed");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!session?.data?.user) {
      redirect("/events");
    }
  }, []);

  return (
    <div className="mx-20 my-10">
      <h1 className="text-3xl font-bold pb-4 bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
        Create an Event
      </h1>

      <form onSubmit={handleEventData}>
        <div className="py-2 flex gap-4">
          <label className="w-28 text-lg font-semibold bg-gradient-to-br from-orange-700 to-teal-700 bg-clip-text text-transparent">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter Title"
            className="w-80 border rounded-md py-1 px-2"
            name="name"
            value={eventData.name}
            onChange={(e) => handleEventCreate(e)}
            required
          />
        </div>
        <div className="py-2 flex gap-4">
          <label className="w-28 font-semibold text-lg bg-gradient-to-br from-orange-700 to-teal-700 bg-clip-text text-transparent">
            Artist
          </label>
          <input
            type="text"
            placeholder="Enter artist name"
            className="w-80 border rounded-md py-1 px-2"
            name="artist"
            value={eventData.artist}
            onChange={(e) => handleEventCreate(e)}
            required
          />
        </div>
        <div className="py-2 flex gap-4">
          <label className=" w-28 font-semibold text-lg bg-gradient-to-br from-orange-700 to-teal-700 bg-clip-text text-transparent">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter event price"
            className="w-80 border rounded-md py-1 px-2"
            name="price"
            value={eventData.price}
            onChange={(e) => handleEventCreate(e)}
            required
          />
        </div>
        <div className="py-2 flex gap-4">
          <label className="w-28 font-semibold text-lg bg-gradient-to-br from-orange-700 to-teal-700 bg-clip-text text-transparent">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter event location"
            className="w-80 border rounded-md py-1 px-2"
            name="location"
            value={eventData.location}
            onChange={(e) => handleEventCreate(e)}
            required
          />
        </div>
        <div className="py-2 flex gap-4">
          <label className="w-28  font-semibold text-lg bg-gradient-to-br from-orange-700 to-teal-700 bg-clip-text text-transparent">
            Date
          </label>
          <input
            type="date"
            className="w-80 border rounded-md py-1 px-2"
            name="date"
            value={eventData.date}
            onChange={(e) => handleEventCreate(e)}
            required
          />
        </div>
        <div className="py-2 flex gap-4">
          <label className="w-28  font-semibold text-lg bg-gradient-to-br from-orange-700 to-teal-700 bg-clip-text text-transparent">
            Time
          </label>
          <input
            type="time"
            className="w-80 border rounded-md py-1 px-2"
            name="time"
            value={eventData.time}
            onChange={(e) => handleEventCreate(e)}
            required
          />
        </div>
        <div className="py-2 flex gap-4">
          <label className="w-28 font-semibold text-lg bg-gradient-to-br from-orange-700 to-teal-700 bg-clip-text text-transparent">
            Description
          </label>
          <textarea
            type="text"
            rows={4}
            placeholder="Enter event description"
            className="w-80 border rounded-md py-1 px-2"
            name="description"
            value={eventData.description}
            onChange={(e) => handleEventCreate(e)}
            required
          />
        </div>
        <button
          type="submit"
          className=" bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
