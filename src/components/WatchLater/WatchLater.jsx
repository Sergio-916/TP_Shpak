import React from 'react';
import MovieList from '../MovieList/MovieList';
import './watchLater.css'

const WatchLater = ({ movies, selectMovie, watchLaterComponent, handleWatchLaterClick, label }) => {
    return (
        <>
        <h2 className='header'>Watch Later Movie List</h2>
          <div className="watch__later">
            <MovieList movies={movies} selectMovie={selectMovie}
            watchLaterComponent={watchLaterComponent} 
            handleWatchLaterClick={handleWatchLaterClick}
            label_right={label}
            />
            </div>
        </>
    );
};

export default WatchLater;