const SearchBox = (props) => {
  return (
    <div className="col col-sm-4 search-box">
      <input
        className="form-control"
        value={props.value}
        onChange={(event) => props.setSearchValue(() => event.target.value)}
        placeholder="Type to search &#x1F50D;"
      />
    </div>
  );
};

export default SearchBox;
