import MovieList from './components/Movielist';
import { useState, useEffect, React } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieListHeading from './components/MovieHeading';
import SearchBox from './components/SearchBox';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const getMovieRequest = async () => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`;
      const res = await fetch(url);
      const resJson = await res.json();
      console.log('search', searchValue);
      console.log('movie', resJson);
      if (resJson.Search) {
        setMovies(() => resJson.Search);
      }
    };
    getMovieRequest();
  }, [searchValue]);

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row movie-list">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
