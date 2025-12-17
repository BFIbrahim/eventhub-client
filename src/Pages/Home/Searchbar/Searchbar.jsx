import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import EventCard from "../../../Components/EventCard";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setFilteredEvents([]);
      setSearched(false);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const result = events.filter(
      (event) =>
        event.title?.toLowerCase().includes(lowerQuery) ||
        event.category?.toLowerCase().includes(lowerQuery) ||
        event.location?.toLowerCase().includes(lowerQuery)
    );

    setFilteredEvents(result);
    setSearched(true);
  };

  return (
    <>
      <div className="flex justify-center text-white">
        <div className="w-full bg-primary shadow-xl">
          <div className="p-14 max-w-4xl mx-auto">
            <h2 className="card-title text-xl font-semibold">
              Find Your Event
            </h2>
            <p className="text-sm text-white">
              Search events by name, category or location
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-4 flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1 text-black">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50">
                  <FiSearch size={18} />
                </span>

                <input
                  type="text"
                  placeholder="Search events..."
                  className="input input-bordered w-full pl-11 h-12"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-secondary text-black h-12 px-8"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10 px-4">
        {searched && (
          filteredEvents.length === 0 ? (
            <p className="text-center text-gray-500">
              No events found...
            </p>
          ) : (
            <div className="border-b border-gray-900 pb-14">
              <h2 className="text-3xl font-bold text-base-content my-4">
                Searched Events
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default SearchBar;
