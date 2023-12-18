import React from 'react';
import MovieList from '../MovieList/MovieList';
import './myfavorites.css'


const MyFavorites = ({ movies, selectMovie, favoriteComponent, handleFavoriteClick, label }) => {
    return (
        <>
            <h2 className='header'>My Favorite Movies</h2>
            <div className="myfavorites">
                <MovieList movies={movies} selectMovie={selectMovie}
                    favoriteComponent={favoriteComponent} handleFavoriteClick={handleFavoriteClick}
                    label_left={label}
                />
            </div>
        </>
    );
};

export default MyFavorites;