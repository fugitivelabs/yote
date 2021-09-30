/**
 * Global DefaultNav component. Up to the designers to decide if should live 
 * as a top-nav, fixed side, menu-prompted, etc. 
 * 
 * Recommended to select a good one from Tailwind UI that matches the brand 
 * and edit from there. 
 * https://tailwindui.com/components/application-ui/headings/page-headings
 */

// import primary libararies
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLoggedInUser } from '../../../resources/user/authService';


import { sendLogout } from '../../../resources/user/authStore';


const DefaultNav = () => {

  // use the hook to get the loggedInUser from the authStore
  const loggedInUser = useLoggedInUser();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleLogout = async () => {
    const { response } = await dispatch(sendLogout());
    history.push("/");
  }

  return (
    <header className="border-b border-solid shadow-sm bg-white">
      <div className="p-2 flex flex-col md:flex-row md:justify-between md:items-center">
        <ul className="list-none p-0 flex flex-col md:flex-row md:items-center">
          <li><NavLink to="/" className="p-2 block">Home</NavLink></li>
          <li><NavLink to="/products" className="p-2 block">Products</NavLink></li>
        </ul>
        {!loggedInUser ?
          <ul className="list-none p-0 flex flex-col md:flex-row md:items-center">
            <li><NavLink to={{ pathname: "/user/login", state: { from: location } }} className="p-2 block">Sign in</NavLink></li>
            <li><NavLink to={{ pathname: "/user/register", state: { from: location } }} className="p-2 block">Register</NavLink></li>
          </ul>
          :
          <ul className="list-none p-0 flex flex-col md:flex-row md:items-center">
            <li><NavLink to="/user/profile">My profile</NavLink></li>
            <button onClick={handleLogout}>Logout</button>
          </ul>
        }
      </div>
    </header>
  )
}

export default DefaultNav;
