import { useEffect, useState } from "react";
import EventCard from "../../Components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default Events;
