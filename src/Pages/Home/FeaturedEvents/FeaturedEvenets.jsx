import { useEffect, useState } from "react";
import EventCard from "../../../Components/EventCard";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then(res => res.json())
      .then(data => {
        const featured = data.filter(event => event.featured === true);
        setEvents(featured.slice(0, 3)); // top 3 featured
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default FeaturedEvents;
