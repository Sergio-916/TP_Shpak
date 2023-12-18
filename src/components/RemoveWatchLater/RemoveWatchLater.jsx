import React from 'react';
import { FaTimes } from "react-icons/fa";
import './removeWatch.css'

const RemoveWatchLater = () => {
    return (
        <>
        <div className='removefav'>
          <span>Remove from Watch later </span>  
          <span className='icon'><FaTimes  /></span>
          </div>
        </>
    );
};

export default RemoveWatchLater;