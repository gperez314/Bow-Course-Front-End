import "./search.style.css";

const Search = ({ onSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search here"
        className="searchBar"
        id="searchBar"
        onChange={onSearchChange} // Handle input change
      />
      <button id="searchButton">&#x1F50E;&#xFE0E;</button>
    </div>
  );
};

export default Search;