import React from "react";
import { useNavigate } from "react-router-dom";
import seasonIcon from "../../assets/seasons-icon.svg";

/**
 * formatDate
 * Convert an ISO date string into a human-readable localized date.
 *
 * @param {string|undefined|null} isoString - ISO date string (e.g. '2023-08-01T00:00:00Z').
 * @returns {string} Formatted date in 'Month Day, Year' (en-US). Returns empty string for falsy input.
 */
function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * PodcastCard
 * Presentational component that renders a single podcast's cover, title, seasons, genres, and last update.
 * Clicking the card navigates to the detailed show page.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.podcast - Podcast data object. Expected fields: `id`, `image`, `title`, `seasons`, `updated`, `genres`.
 * @param {Array<{id: number, title: string}>} [props.genres=[]] - Array of available genre objects to map ids -> titles.
 * @returns {JSX.Element} Card UI for a podcast.
 */
export default function PodcastCard({ podcast, genres = [] }) {
  const navigate = useNavigate();

  const image = podcast.image;
  const title = podcast.title;
  const seasons = podcast.seasons;
  const updated = podcast.updated;
  const genreIds = podcast.genres;

  let genreList = [];

  if (Array.isArray(genreIds) && genreIds.length > 0) {
    genreList = genreIds
      .map((id) => {
        const idStr = Number(id);
        const g = genres.find((gg) => gg.id === idStr);
        return g?.title;
      })
      .filter(Boolean);
  }

  /**
   * Handle podcast selection.
   * Navigates to the show detail page with the podcast ID.
   */
  const onSelect = () => {
    navigate(`/show/${podcast.id}`);
  };

  return (
    <article
      className="podcast-item"
      role="button"
      tabIndex={0}
      aria-label={`${title} details`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect();
      }}
    >
      <img src={image} alt={`${title} cover`} className="podcast-cover" />
      <div className="podcast-info">
        <h2>{title}</h2>
        <span className="seasons">
          <img src={seasonIcon} alt="seasons icon" className="season-icon" />
          <span>{`${seasons} season${seasons === 1 ? "" : "s"}`}</span>
        </span>
        <div className="genre-tags">
          {genreList.length > 0 &&
            genreList.map((g) => (
              <span key={g} className="genre-tag">
                {g}
              </span>
            ))}
        </div>
        <span className="updated">Updated: {formatDate(updated)}</span>
      </div>
    </article>
  );
}
