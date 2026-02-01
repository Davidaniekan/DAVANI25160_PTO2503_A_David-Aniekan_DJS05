import React from "react";
import { GenreFilter } from "../Filters/GenreFilter.jsx";
import { SortSelect } from "../Filters/SortSelect.jsx";

/**
 * Container
 * High-level UI container responsible for rendering
 * application-wide controls such as filters and sorting.
 *
 * Responsibilities:
 * - Display genre filter component
 * - Display sort select component
 * - Provide layout space for podcast grid
 *
 * @component
 * @returns {JSX.Element} Container UI with filters 
 */

export function Container() {
  return (
    <div className="container">
      {/* FILTER CONTROLS */}
      <div className="filters">
        <GenreFilter />
        <SortSelect />
      </div>

      {/* Podcast cards */}
      <div id="podcastList" className="podcast-list"></div>
    </div>
  );
}

export default Container;
