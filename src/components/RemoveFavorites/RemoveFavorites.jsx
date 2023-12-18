import React from 'react';
import './removeFavorites.css'
import { FaTimes } from "react-icons/fa";

const RemoveFavorites = () => {
    return (
        <div className='removefav'>
            <span >Remove from Favirites </span>
            <span className='icon'><FaTimes  /></span>
        </div>
    );
};

export default RemoveFavorites;
