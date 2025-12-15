import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaChair } from "react-icons/fa";
import { Link } from "react-router";

const EventCard = ({ event }) => {
  return (
    <div className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <img
        src={event.image}
        alt={event.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
        <div className="flex items-center text-sm text-base-content/70 mb-1">
          <FaCalendarAlt className="mr-1" /> {new Date(event.date).toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-base-content/70 mb-1">
          <FaMapMarkerAlt className="mr-1" /> {event.location}
        </div>
        <div className="flex items-center text-sm text-base-content/70 mb-2">
          <FaChair className="mr-1" /> {event.seats} seats
        </div>
        <Link
          to={`/eventsDetails/${event._id}`}
          className="mt-auto btn btn-primary w-full text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
