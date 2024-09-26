"use client";

import EventCard from "@/components/EventCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Events() {
  const searchParams = useSearchParams();
  const searchArtist = searchParams.get("artist");
  const searchTag = searchParams.get("tag");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "https://qevent-backend.labs.crio.do/events"
        );
        const events = await response.json();
        setEvents(events);
      } catch (error) {
        throw new Error();
      }
    }
    fetchEvents();
  }, []);

  if (searchParams.has("artist")) {
    return (
      <div className="flex flex-wrap p-8 gap-4 justify-center">
        {events
          .filter((event) => event.artist === searchArtist)
          .map((event) => (
            <EventCard key={event.id} eventData={event} />
          ))}
      </div>
    );
  }

  if (searchParams.has("tag")) {
    return (
      <div className="flex flex-wrap p-8 gap-4 justify-center">
        {events
          .filter((event) => event.tags.includes(searchTag))
          .map((event) => (
            <EventCard key={event.id} eventData={event} />
          ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap p-8 gap-4 justify-center">
      {events.map((event) => (
        <EventCard key={event.id} eventData={event} />
      ))}
    </div>
  );
}
