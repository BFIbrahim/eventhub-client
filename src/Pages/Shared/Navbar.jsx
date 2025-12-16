import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';
import useAxios from '../../Hooks/useAxios';

const Navbar = () => {

    const { user, logOut } = UseAuth()
    console.log(user)

    const axios = useAxios()
    const [loadeduser, setLoadedUser] = useState([])

    useEffect(() => {
        axios.get('/users')
        .then(res => {
            console.log(res.data)
            setLoadedUser(res.data)
        })
        .catch(error => {
            console.log(error.message)
        })
    }, [])



    const hundleLogout = () => {
        logOut()
    }

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/my-bookings">My Bookings</NavLink></li>
        
        {
            loadeduser.map(user => user.role === "admin" ? <li><NavLink to="/add-new-event">Add Event</NavLink></li> : <></>)
        }
    </>

    return (
        <div className="navbar bg-primary text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-bold text-white hover:bg-primary hover:shadow-none hover:border-none">EventHub</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <Link onClick={hundleLogout} className="btn btn-secondary text-black">logout</Link> : <Link to="/login" className="btn btn-secondary text-black">Login</Link>
                }

                {
                    user ? <h3 className='px-2 text-xl font-semibold'>{user.displayName}</h3> : <></>
                }
            </div>
        </div>
    );
};

export default Navbar;