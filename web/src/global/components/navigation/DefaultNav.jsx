/**
 * Global DefaultNav component. Up to the designers to decide if should live 
 * as a top-nav, fixed side, menu-prompted, etc. 
 * 
 * Recommended to select a good one from Tailwind UI that matches the brand 
 * and edit from there. 
 * https://tailwindui.com/components/application-ui/headings/page-headings
 */

// import primary libararies
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import _ from 'lodash'

import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetLoggedInUser } from '../../../resources/user/authService';

import { sendLogout } from '../../../resources/user/authStore';

// import UI components
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
// import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'


const DefaultNav = () => {

  // use the hook to get the loggedInUser from the authStore
  const { loggedInUser, ...authQuery } = useGetLoggedInUser();

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    const { response } = await dispatch(sendLogout());
    history.push("/");
  }


  return (
    <header>
      <h3>Navigation</h3>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
      </ul>
      {!loggedInUser ?
        <ul>
          <li><NavLink to="/user/login">Sign in</NavLink></li>
          <li><NavLink to="/user/register">Register</NavLink></li>
        </ul>
        :
        <ul>
          <li><NavLink to="/user/profile">My profile</NavLink></li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      }
      <hr/>
    </header>
  )
}

export default DefaultNav;
