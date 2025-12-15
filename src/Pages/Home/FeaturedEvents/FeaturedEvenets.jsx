import { useEffect, useState } from "react";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import { Link } from "react-router";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then(res => res.json())
      .then(data => {
        const featured = data.filter(event => event.featured === true);
        setEvents(featured.slice(0, 3)); // top 3
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="mt-14">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-base-content">Featured Events</h2>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <div
            key={event._id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <figure className="h-52 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title text-lg font-semibold">{event.title}</h3>
              <div className="text-sm text-base-content/70 space-y-1 mt-2">
                <p className="flex items-center gap-2">
                  <FiCalendar /> {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <FiMapPin /> {event.location}
                </p>
                <p className="flex items-center gap-2">
                  <FiUsers /> {event.seats} seats
                </p>
              </div>
              <div className="card-actions mt-4">
                <Link
                  to={`/events/${event._id}`}
                  className="btn btn-primary btn-sm w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;
