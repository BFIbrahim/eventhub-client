import { useEffect, useState } from "react";
import EventCard from "../../../Components/EventCard";
import useAxios from "../../../Hooks/useAxios";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const axios = useAxios()



  useEffect(() => {
    axios.get("/events")
    
      .then(res => {
        setEvents(res.data.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div >
      <div className="text-center mb-4 mt-10">
        <h2 className="text-3xl font-bold text-base-content">Featured Events</h2>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
