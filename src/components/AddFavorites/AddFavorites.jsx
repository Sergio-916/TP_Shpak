import React from 'react';
import { FaHeart } from "react-icons/fa";

const AddFavorites = () => {
    return (
        <>
          <span className='favorites'>Add to Favorites <FaHeart style={{color:'red'}} /></span>  
        </>
    );
};

export default AddFavorites;