import React from "react";
import './movie.css';
import MovieList from "../MovieList/MovieList";


const Movie = ({ query, dosetQuery, movies, queryFlag, searched, selectMovie,
    handleFavoriteClick, favoriteComponent, watchLaterComponent, handleWatchLaterClick, 
    label_left, label_right }) => {


    return (
        <>
            <h2>Movie search</h2>
            {queryFlag && (<h3>Search results for: {query}</h3>)}
            <input className="input"
                onChange={(event) => { dosetQuery(event); }}
                type="text"
                placeholder=" Input movie name here"
            />

            <div className='search'>
                {movies.length > 0 ? (
                    <MovieList movies={movies} selectMovie={selectMovie}
                        favoriteComponent={favoriteComponent} handleFavoriteClick={handleFavoriteClick}
                        watchLaterComponent={watchLaterComponent}
                        handleWatchLaterClick={handleWatchLaterClick}
                        label_left={label_left} label_right={label_right} />
                ) : searched && queryFlag && (<h2>No movies to display</h2>)
                }

            </div>

        </>
    );
};

export default Movie;