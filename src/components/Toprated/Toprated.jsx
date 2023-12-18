
import React from 'react';
import './Toprated.css'
import MovieList from '../MovieList/MovieList';


const Toprated = ({ movies, selectMovie, handleFavoriteClick,
  favoriteComponent, watchLaterComponent, handleWatchLaterClick, label_left, label_right }) => {

  return (
    <>

      <h2 className='header'>Top Rated Movies</h2>
      <div className="toprated">
        <MovieList movies={movies} selectMovie={selectMovie} handleFavoriteClick={handleFavoriteClick}
          favoriteComponent={favoriteComponent} watchLaterComponent={watchLaterComponent}
          handleWatchLaterClick={handleWatchLaterClick} label_left={label_left} label_right={label_right}
        />
      </div>
    </>
  );
};

export default Toprated;


