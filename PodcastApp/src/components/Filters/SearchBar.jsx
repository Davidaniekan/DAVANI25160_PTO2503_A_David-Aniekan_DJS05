import React, { useContext, useRef, useEffect, useState } from "react";
import searchIcon from "../../assets/search-icon.svg";
import { PodcastContext } from "../../PodcastContext.jsx";

/**
 * SearchBar component for searching podcasts by title.
 *
 * Responsibilities:
 * - Render search input and search button
 * - Handle search input changes
 * - Manage search visibility toggle
 * - Auto-focus input when visible
 * - Close on Enter key press
 *
 * @component
 * @returns {JSX.Element} Search input UI with button
 */
export function SearchBar() {
  const { search, setSearch } = useContext(PodcastContext);
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const openSearch = () => setShowSearch(true);
  const closeSearch = () => setShowSearch(false);

  /**
   * Handles changes to the search input.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const onChange = (e) => setSearch(e.target.value);

  /**
   * Handles keyboard interaction inside the search input.
   * Pressing Enter will close the search field.
   */
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      closeSearch();
    }
  };

  const searchContainerClass = `search-container ${showSearch ? "active" : ""}`;

  return (
    <div className={searchContainerClass}>
      <button className="search-btn" type="button" onClick={openSearch}>
        <img src={searchIcon} alt="search" className="search-icon" />
      </button>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search podcasts..."
        id="searchBar"
        className="search-input"
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
        aria-label="Search podcasts"
      />
    </div>
  );
}

export default SearchBar;
