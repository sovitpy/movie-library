import { useState, useEffect, React } from 'react';
import MovieListHeading from './components/MovieHeading';
import SearchBox from './components/SearchBox';
import MovieList from './components/Movielist';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState(new Set()); //using Set to avoid duplicates

  useEffect(() => {
    const getMovieRequest = async () => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`;
      const res = await fetch(url);
      const resJson = await res.json();
      if (resJson.Search) {
        setMovies(() => resJson.Search);
      }
    };
    getMovieRequest();
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );
    setFavourites(() => new Set(movieFavourites));
  }, []);

  const saveToLocalStorage = (items) => {
    const stringifiedItems = JSON.stringify([...items]);
    localStorage.setItem('react-movie-app-favourites', stringifiedItems);
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites((prev) => new Set(newFavouriteList));
    saveToLocalStorage(new Set(newFavouriteList));
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites].filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(new Set(newFavouriteList));
    saveToLocalStorage(new Set(newFavouriteList));
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center header">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row movie-list">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      {favourites.size > 0 && (
        <>
          <div className="row d-flex align-items-center header">
            <MovieListHeading heading="Favourites" />
          </div>
          <div className="row movie-list">
            <MovieList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
