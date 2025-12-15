import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", query);
  };

  return (
    <div className="flex justify-center text-white">
      <div className=" w-full bg-primary shadow-xl">
        <div className="p-14 max-w-4xl mx-auto">
          {/* Title */}
          <h2 className="card-title text-xl font-semibold">
            Find Your Event
          </h2>
          <p className="text-sm text-white">
            Search events by name, category or location
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-4 flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
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

            <button className="btn btn-secondary text-black h-12 px-8">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
