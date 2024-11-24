// src/components/ThemeToggle.js
import React from 'react';
import { FaLightbulb } from "react-icons/fa";
import '../App.css'

const ThemeToggle = ({ onToggleTheme, theme}) => {
  return <button onClick={onToggleTheme} id='theme_toggle'>
    {theme === 'dark' ? <FaLightbulb style={{position: 'fixed', transform: 'rotate(180deg)',top: '20px', right: '20px', scale: '2'}}/> : 
    <FaLightbulb style={{color : "black", position: 'fixed', transform: 'rotate(180deg)', top: '20px', right: '20px', scale: '2'}}/>}
  </button>; 
};

export default ThemeToggle;
