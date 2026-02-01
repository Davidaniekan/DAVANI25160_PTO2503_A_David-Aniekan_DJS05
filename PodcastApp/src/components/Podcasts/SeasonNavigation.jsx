import React, { useState, useEffect } from "react";
import styles from "./SeasonNavigation.module.css";

/**
 * SeasonNavigation
 * Component to display episodes for a selected season of a podcast show.
 *
 * Features:
 * - Display episode list for the current season
 * - Episode details including number, title, duration, and release date
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.seasons - Array of season objects with episodes.
 * @param {number} props.selectedSeasonIndex - Index of the currently selected season.
 * @param {string} props.showUpdated - Show's last updated date (ISO string) for release year.
 * @returns {JSX.Element} Season navigation UI.
 */
export default function SeasonNavigation({
  seasons = [],
  selectedSeasonIndex = 0,
  showUpdated = "",
}) {
  const [episodeDurations, setEpisodeDurations] = useState({});
  const [expandedEpisodeIndex, setExpandedEpisodeIndex] = useState(null);

  if (!seasons || seasons.length === 0) {
    return <p className={styles["no-seasons"]}>No seasons available.</p>;
  }

  const selectedSeason = seasons[selectedSeasonIndex];
  const episodes = selectedSeason?.episodes || [];

  // Fetch durations for all episodes in the selected season
  useEffect(() => {
    const fetchDurations = async () => {
      const durations = {};
      for (const episode of episodes) {
        if (episode.file && !episodeDurations[episode.file]) {
          const duration = await getAudioDuration(episode.file);
          durations[episode.file] = duration;
        }
      }
      if (Object.keys(durations).length > 0) {
        setEpisodeDurations((prev) => ({ ...prev, ...durations }));
      }
    };

    fetchDurations();
  }, [episodes]);

  /**
   * Format duration from milliseconds to HH:MM:SS or MM:SS format
   * @param {number} durationMs - Duration in milliseconds
   * @returns {string} Formatted duration string
   */
  const formatDuration = (durationMs) => {
    if (!durationMs) return "0:00";
    const totalSeconds = Math.floor(durationMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  /**
   * Format date to a readable format
   * @param {string} isoString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /**
   * Get duration from audio file URL
   * @param {string} fileUrl - URL to audio file
   * @returns {Promise<number>} Duration in milliseconds
   */
  const getAudioDuration = (fileUrl) => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.addEventListener(
        "loadedmetadata",
        () => {
          resolve(audio.duration * 1000); // Convert to milliseconds
        },
        false,
      );
      audio.addEventListener(
        "error",
        () => {
          resolve(0); // Return 0 if error
        },
        false,
      );
      audio.src = fileUrl;
    });
  };

  /**
   * Truncate description to a maximum length
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text with ellipsis if needed
   */
  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  /**
   * Toggle expanded state of an episode description
   * Only one episode can be expanded at a time
   * @param {number} index - Episode index
   */
  const toggleExpandedDescription = (index) => {
    setExpandedEpisodeIndex((prev) =>
      prev === index ? null : index,
    );
  };

  return (
    <div className={styles["season-navigation"]}>
      {/* Season Info */}
      <div className={styles["season-info"]}>
        {selectedSeason?.image && (
          <img
            src={selectedSeason.image}
            alt={`Season ${selectedSeason.season}`}
            className={styles["season-image"]}
          />
        )}
        <div className={styles["season-details"]}>
          <h3 className={styles["season-info-title"]}>
            Season {selectedSeason.season}: {selectedSeason.title}
          </h3>
          {selectedSeason.description && (
            <p className={styles["season-info-description"]}>
              {selectedSeason.description}
            </p>
          )}
          <p className={styles["season-info-meta"]}>
            <span>
              {episodes.length} Episode{episodes.length === 1 ? "" : "s"}
            </span>
            {showUpdated && (
              <>
                <span>•</span>
                <span>Released {showUpdated.substring(0, 4)}</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Episodes List */}
      <ul className={styles["episodes-list"]}>
        {episodes.map((episode, index) => (
          <li key={index} className={styles["episode-item"]}>
            {(episode.image || selectedSeason?.image) && (
              <img
                src={episode.image || selectedSeason?.image}
                alt={episode.title}
                className={styles["episode-image"]}
              />
            )}
            <div className={styles["episode-content"]}>
              <div className={styles["episode-header"]}>
                <span className={styles["episode-number"]}>
                  Episode{" "}
                  {String(episode.episode || index + 1).padStart(2, "0")}
                </span>
                <h5 className={styles["episode-title"]}>{episode.title}</h5>
              </div>
              <p
                className={styles["episode-description"]}
                onClick={() => toggleExpandedDescription(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleExpandedDescription(index);
                  }
                }}
              >
                {expandedEpisodeIndex === index
                  ? episode.description
                  : truncateText(episode.description, 150)}
              </p>
              <div className={styles["episode-meta"]}>
                <span className={styles["episode-duration"]}>
                  {episodeDurations[episode.file]
                    ? formatDuration(episodeDurations[episode.file])
                    : "Loading..."}
                </span>
                <span className={styles["episode-date"]}>
                  <span>•</span>
                  <span>{formatDate(showUpdated)}</span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
