import React, { useContext } from "react";
import { PodcastContext } from "../../PodcastContext.jsx";
import { genres as GENRE_LIST } from "../../data.js";

/**
 * GenreFilter component for filtering podcasts by genre.
 *
 * Responsibilities:
 * - Render genre filter dropdown
 * - Handle genre selection changes
 * - Display all available genres from the application data
 *
 * @component
 * @returns {JSX.Element} Genre filter dropdown UI
 */
export function GenreFilter() {
  const { genre, setGenre } = useContext(PodcastContext);

  /**
   * Handles changes to the genre filter dropdown.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event
   */
  const onGenreChange = (e) => setGenre(e.target.value);

  return (
    <>
      {/* GENRE SELECT */}
      <label htmlFor="genreSelect">Filter by:</label>
      <select id="genreSelect" value={genre} onChange={onGenreChange}>
        <option value="all">All Genres</option>

        {/* Render genre options from static data */}
        {GENRE_LIST.map((g) => (
          <option key={g.id} value={g.id}>
            {g.title}
          </option>
        ))}
      </select>
    </>
  );
}

export default GenreFilter;
