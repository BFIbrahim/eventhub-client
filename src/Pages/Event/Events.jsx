import { useEffect, useState } from "react";
import EventCard from "../../Components/EventCard";
import useAxios from "../../Hooks/useAxios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const axios = useAxios()

  useEffect(() => {
    axios.get("/events")
    .then(res => {
      console.log(res)
      setEvents(res.data)
    })
    .catch(error => {
      console.log(error.message)
    })

  }, []);

  console.log(events)

  return (
    <div className="container mx-auto px-4 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default Events;
