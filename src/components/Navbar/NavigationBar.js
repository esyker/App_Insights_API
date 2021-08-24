import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

import LinkLogo from "../../images/logo.png";

const NavigationBar = () => {
  return (
      <Nav>
        <NavLink to='/'>
          <img src={LinkLogo} alt='logo' />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/about'>
            About
          </NavLink>
          <NavLink to='/services'>
            Services
          </NavLink>
          <NavLink to='/appinsights-queries'>
            AppInsights API
          </NavLink>
          <NavLink to='/appinsights-custom-queries'>
            Custom queries
          </NavLink>
          <NavLink to='/sign-up'>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
  );
};

export default NavigationBar;