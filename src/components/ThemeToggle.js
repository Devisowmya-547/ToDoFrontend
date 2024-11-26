// src/components/ThemeToggle.js
import React from 'react';
import { FaLightbulb } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import '../App.css'
import Cookies from 'js-cookie'

const ThemeToggle = ({ onToggleTheme, theme}) => {

  const handleLogout = () => {
    if(window.confirm('Are you sure you want to logout')){
      Cookies.remove('email');
      window.location.reload();
    }
  }

  return (
    <div style={{background: 'none'}}>
      <MdLogout id='logout' onClick={handleLogout}/>
      <FaLightbulb id='theme_toggle_switch' onClick={onToggleTheme} style={{color : theme == 'dark' ? 'white' : 'black', position: 'fixed', transform: 'rotate(180deg)',top: '20px', left: '50px', scale: '2'}}/>
    </div>
  ); 
};

export default ThemeToggle;
