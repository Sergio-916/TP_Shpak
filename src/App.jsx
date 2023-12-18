import * as React from 'react';
import { useEffect, useState } from 'react'
import Toprated from './components/Toprated/Toprated'
import Movie from './components/Movie/Movie'
import Modal from './components/Modal/Modal'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import AddFavorites from './components/AddFavorites/AddFavorites';
import './App.css'
import Genres from './genres.json'
import MyFavorites from './components/MyFavorites/MyFavorites';
import { useMediaQuery } from '@mui/material';
import RemoveFavorites from './components/RemoveFavorites/RemoveFavorites';
import WatchLater from './components/WatchLater/WatchLater';
import RemoveWatchLater from './components/RemoveWatchLater/RemoveWatchLater';
import AddWatchLater from './components/AddWatchLater/AddWatchLater';


function App() {
  const [modalActive, setModalActive] = useState(false);
  const [query, setQuery] = useState(''); // Movie search
  const [movieModal, setMovieModal] = useState([]); // data for modal window
  const [movies, setMovie] = useState([]); //  useStare for query API
  const [topMovies, setTopMovie] = useState([]); // useState for top movies API
  const [favorites, setFavorites] = useState([]); // array for favorites movies API
  const [queryFlag, setQueryFlag] = useState(false);
  const [searched, setSearched] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [watchLater, setWatchLater] = useState([]);


  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function dosetQuery(event) {
    setQuery(event.target.value)
  }

  // Open Modal window
  const selectMovie = (movie) => {
    setModalActive(true)
    setMovieModal(movie)
  }

  // add Favorites movies
  const addFavoriteMovie = (movie) => {
    const isAlreadyAdded = favorites.some((favMovie) => favMovie.id === movie.id)
    if (isAlreadyAdded) {
      return;
    }
    const newFavoritesList = [...favorites, movie]
    setFavorites(newFavoritesList);
    saveToLocalStorageFav(newFavoritesList);
  }

  // Remove Favorite
  const removeFavoriteMovie = (movie) => {
    const newFavoritesList = favorites.filter((favorite) => favorite.id !== movie.id)
    setFavorites(newFavoritesList);
    saveToLocalStorageFav(newFavoritesList);
  }
  // add Watch Later
  const addWatchLaterMovie = (movie) => {
    const  isWatchAdded = watchLater.some((watchMov) => watchMov.id === movie.id)
if (isWatchAdded) {
  return;
}
    const newWatchLaterList = [...watchLater, movie]
    setWatchLater(newWatchLaterList);
    saveToLocalStorageWatch(newWatchLaterList);
  }
  // Remove WatchLater
  const removeWatchLaterMovie = (movie) => {
    const newWatchLaterList = watchLater.filter((item) => item.id !== movie.id)
    setWatchLater(newWatchLaterList);
    saveToLocalStorageWatch(newWatchLaterList);
  }

  // autorisation in TMDB
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTFhYjQyNmQ2NzI5NGNmYzhlNjFjNjBjNWM3MmU4OSIsInN1YiI6IjY1Njc1ZDQ1MDIxY2VlMDBjNjA2ZTg0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.66LspXousqJNfSIYvA-JdP5d6bf1IytcjVSGniRq400'
    }
  };

  // query search
  const getMovieRequest = async (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}`
    const response = await fetch(url, options);
    const responseJson = await response.json();
    if (responseJson.results) {
      setMovie(responseJson.results)
    }
  }
  useEffect(() => {
    if (query.length > 0) {
      setQueryFlag(true)
      setSearched(true)
    }
  }, [query])

  useEffect(() => {
    getMovieRequest(query)
  }, [query])

  //Top rated search
  const getTopMovie = async () => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
    const response = await fetch(url, options);
    const responseJson = await response.json();
    if (responseJson.results) {
      setTopMovie(responseJson.results)
    }
  }
  useEffect(() => {
    getTopMovie()
  }, [])

  // Local Storage

  const saveToLocalStorageFav = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
  }

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('react-movie-app-favorites')
    );
    if (movieFavorites && Array.isArray(movieFavorites)) {
      setFavorites(movieFavorites);
    }
  }, [])

  const saveToLocalStorageWatch = (items) => {
    localStorage.setItem('react-movie-app-watch-later', JSON.stringify(items))
  }
  useEffect(() => {
    const movieWatch = JSON.parse(
      localStorage.getItem('react-movie-app-watch-later')
    );
    if (movieWatch && Array.isArray(movieWatch)) {
      setWatchLater(movieWatch);
    }

  }, []);

  //select Genres
  const genres = Genres.genres;


  const label_left = 'overlay__left';
  const label_right = 'overlay__right';
  const label_full = 'overlay__full';



  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white' }}>
            <TabList
              orientation={isSmallScreen ? 'vertical' : 'horizontal'}
              onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Top rated" value="1" />
              <Tab label="Movie Searsh" value="2" />
              <Tab label={`My Favorites (${favorites?.length || 0})`} value="3" />
              <Tab label={`Whatch later (${watchLater?.length || 0})`} value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Toprated movies={topMovies}
              selectMovie={selectMovie}
              favoriteComponent={<AddFavorites />}
              watchLaterComponent={<AddWatchLater />}
              handleFavoriteClick={addFavoriteMovie}
              handleWatchLaterClick={addWatchLaterMovie}
              label_left={label_left}
              label_right={label_right}
            />
          </TabPanel>

          <TabPanel value="2">
            <Movie query={query} dosetQuery={dosetQuery}
              movies={movies} selectMovie={selectMovie}
              favoriteComponent={<AddFavorites />}
              watchLaterComponent={<AddWatchLater />}
              handleFavoriteClick={addFavoriteMovie}
              handleWatchLaterClick={addWatchLaterMovie}
              queryFlag={queryFlag} searched={searched}
              label_left={label_left}
              label_right={label_right} />
          </TabPanel>

          <TabPanel

            value="3">
            <MyFavorites movies={favorites} selectMovie={selectMovie}
              handleFavoriteClick={removeFavoriteMovie}
              handleWatchLaterClick={addWatchLaterMovie}
              favoriteComponent={<RemoveFavorites />}
              watchLaterComponent={<addWatchLater />}
              label={label_full} />
          </TabPanel>

          <TabPanel
            value="4">
            <WatchLater movies={watchLater}
              selectMovie={selectMovie} watchLaterComponent={<RemoveWatchLater />}
              handleFavoriteClick={addFavoriteMovie}
              handleWatchLaterClick={removeWatchLaterMovie}
              label={label_full} />

          </TabPanel>

        </TabContext>
      </Box>



      <Modal active={modalActive} setActive={setModalActive} >
        <div className='one_bigwindow'>

          <img className='image' src={`https://image.tmdb.org/t/p/w500${movieModal.poster_path}`} alt="" />

          <div className="movie__description">
            <p><b>{`Title: ${movieModal.title}`}</b></p>
            <p>{`Overview: ${movieModal.overview}`}</p>
            <p>{`Year: ${movieModal.release_date ? movieModal.release_date.slice(0, 4) : 'N/A'}`}</p>
            <p>{`Rating: ${parseFloat(movieModal.vote_average).toFixed(1)}`}</p>
            <span>Genre: </span>
            {genres && movieModal.genre_ids &&
              genres
                .filter((genre) => movieModal.genre_ids.includes(genre.id))
                .map((genre, index, array) => (
                  <span key={genre.id}>
                    {`${genre.name}${index !== array.length - 1 ? ', ' : ''}`}
                  </span>
                ))
            }
          </div>
        </div>
      </Modal>
    </>
  )
}

export default App
