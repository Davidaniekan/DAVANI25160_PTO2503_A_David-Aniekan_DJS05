import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeasonNavigation from "../components/Podcasts/SeasonNavigation.jsx";
import styles from "./ShowDetail.module.css";

/**
 * Genre ID to title mapping
 * @type {Object<number, string>}
 */
const GENRE_MAP = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

/**
 * ShowDetail
 * Displays comprehensive information about a specific podcast show.
 *
 * Features:
 * - Fetch show data by ID from dynamic route parameter
 * - Display show title, image, description, genres, and last updated date
 * - Season navigation component to browse episodes
 * - Back button to return to homepage
 * - Loading, error, and empty state handling
 *
 * @component
 * @returns {JSX.Element} Show detail page
 */
export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  /**
   * Fetch show data on component mount
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // Fetch the specific show details
          const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
          if (!res.ok) throw new Error(`${res.status}`);
          const showData = await res.json();

          // Also fetch all podcasts to get genres for this show
          const allRes = await fetch("https://podcast-api.netlify.app/");
          if (!allRes.ok) throw new Error(`${allRes.status}`);
          const allData = await allRes.json();

          // Find the podcast in the full list to get genres
          const podcastFromList = allData.find((p) => p.id === id);
          if (podcastFromList && podcastFromList.genres) {
            showData.genres = podcastFromList.genres;
          }

          setShow(showData);
        }
      } catch (err) {
        console.error(`Failed to fetch podcast with id ${id}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /**
   * Format date string to readable format
   * @param {string} isoString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /**
   * Get genre titles from genre IDs
   * @param {number[]} genreIds - Array of genre IDs
   * @returns {string[]} Array of genre titles
   */
  const getGenreTitles = (genreIds) => {
    if (!Array.isArray(genreIds)) return [];
    return genreIds.map((id) => GENRE_MAP[id] || null).filter(Boolean);
  };

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <div className={styles["show-detail-container"]}>
        <button className={styles["back-button"]} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className={styles["message-container"]}>
          <div className={styles["spinner"]}></div>
          <p className={styles["loading"]}>Loading show details...</p>
        </div>
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className={styles["show-detail-container"]}>
        <button className={styles["back-button"]} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className={styles["message-container"]}>
          <div className={styles["error"]}>
            Error loading show details: {error}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render empty state
   */
  if (!show) {
    return (
      <div className={styles["show-detail-container"]}>
        <button className={styles["back-button"]} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className={styles["message-container"]}>
          <p className={styles["empty"]}>Show not found.</p>
        </div>
      </div>
    );
  }

  const seasonCount = show?.seasons?.length || 0;
  const totalEpisodes =
    show?.seasons?.reduce(
      (total, season) => total + (season.episodes?.length || 0),
      0,
    ) || 0;

  return (
    <div className={styles["show-detail-container"]}>
      {/* Back Button */}
      <button className={styles["back-button"]} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Show Hero Section */}
      <div className={styles["show-hero"]}>
        <div className={styles["show-image-container"]}>
          <img
            src={show.image}
            alt={show.title}
            className={styles["show-image"]}
          />
        </div>

        <div className={styles["show-header-content"]}>
          <h1 className={styles["show-title"]}>{show.title}</h1>
          <p className={styles["show-description"]}>{show.description}</p>

          {/* Info Grid - Genres and Stats */}
          <div className={styles["info-grid"]}>
            {/* Genres Section */}
            {show.genres && show.genres.length > 0 && (
              <div className={styles["genres-section"]}>
                <h3 className={styles["section-label"]}>Genres</h3>
                <div className={styles["genre-list"]}>
                  {getGenreTitles(show.genres).map((genre) => (
                    <span key={genre} className={styles["genre-tag"]}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Last Updated */}
            <div className={styles["info-card"]}>
              <h3 className={styles["section-label"]}>Last Updated</h3>
              <p className={styles["info-value"]}>{formatDate(show.updated)}</p>
            </div>

            {/* Total Seasons */}
            <div className={styles["info-card"]}>
              <h3 className={styles["section-label"]}>Total Seasons</h3>
              <p className={styles["info-value"]}>
                {`${seasonCount} Season${seasonCount === 1 ? "" : "s"}`}
              </p>
            </div>

            {/* Total Episodes */}
            <div className={styles["info-card"]}>
              <h3 className={styles["section-label"]}>Total Episodes</h3>
              <p className={styles["info-value"]}>
                {`${totalEpisodes} Episode${totalEpisodes === 1 ? "" : "s"}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Season Navigation */}
      {show.seasons && show.seasons.length > 0 && (
        <>
          {/* Season Header with Selector */}
          <div className={styles["season-header"]}>
            <h2 className={styles["season-title"]}>Current Season</h2>
            <div className={styles["season-selector"]}>
              <select
                id="seasonSelect"
                value={selectedSeasonIndex}
                onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
              >
                {show.seasons.map((season, index) => (
                  <option key={index} value={index}>
                    Season {season.season}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <SeasonNavigation
            seasons={show.seasons}
            selectedSeasonIndex={selectedSeasonIndex}
            showUpdated={show.updated}
          />
        </>
      )}

      {/* No Seasons Message */}
      {(!show.seasons || show.seasons.length === 0) && (
        <div className={styles["message-container"]}>
          <p className={styles["empty"]}>No seasons available for this show.</p>
        </div>
      )}
    </div>
  );
}
