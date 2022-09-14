import { useState } from 'react';

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, idx) => (
        <div className="d-flex justify-content-start m-3">
          <img src={movie.Poster} alt={movie.Title} key={idx} />
        </div>
      ))}
    </>
  );
};

export default MovieList;
