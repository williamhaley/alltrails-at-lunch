const SearchBox = () => {
  return (
    <input
      type="text"
      className="form-control"
      aria-label="Restaurant search box"
      name="query"
      placeholder="Search for a restaurant"
    ></input>
  );
};

export default SearchBox;
