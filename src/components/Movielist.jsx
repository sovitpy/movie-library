const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, idx) => (
        <div className="d-flex justify-content-start m-3" key={idx}>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      ))}
    </>
  );
};

export default MovieList;
