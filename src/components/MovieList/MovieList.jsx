import React from 'react';
import './movieList.css'


const MovieList = ({ movies, selectMovie,  handleFavoriteClick, favoriteComponent, 
    handleWatchLaterClick, watchLaterComponent, label_left, label_right }) => {

    return (
        <>
            {movies
                .filter((movie) => movie.poster_path)
                .map((movie) => (
                    <div className="one_movie image_container" key={movie.id} >
                        <img className='image2' onClick={() => selectMovie(movie)} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""  />
                        <div className={label_left} onClick={() => handleFavoriteClick(movie)}>{favoriteComponent}</div>
                        <div className={label_right} onClick={() => handleWatchLaterClick(movie)}>{watchLaterComponent}</div>
                        {movie.title}
                    </div>
                ))
            }
        </>
    );
};

export default MovieList;