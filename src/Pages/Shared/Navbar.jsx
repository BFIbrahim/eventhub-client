import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import useAxios from "../../Hooks/useAxios";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const axios = useAxios();

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/users/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [user, axios]);

  const handleLogout = () => {
    logOut();
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/events">Events</NavLink>
      </li>
      <li>
        <NavLink to="/my-bookings">My Bookings</NavLink>
      </li>

      {dbUser?.role === "admin" && (
        <li>
          <NavLink to="/add-new-event">Add Event</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-primary text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow text-black"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold text-white">
          Event
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <>
            <Link
              to="/profile"
              className="px-2 text-lg font-semibold"
            >
              {user.displayName}
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-secondary text-black"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-secondary text-black">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
