import { Container } from "../components/Layout/Container.jsx";
import { genres } from "../data.js";
import PodcastGrid from "../components/Podcasts/PodcastGrid";
import { Pagination } from "../components/UI/Pagination.jsx";

/**
 * Home page component for the PodcastApp.
 *
 * Responsibilities:
 * - Render the main podcast browsing interface.
 * - Display filter and sort controls.
 * - Display podcast grid and pagination.
 * - Handle loading and error states passed from App.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.loading - Whether data is loading.
 * @param {string} props.error - Error message if fetch failed.
 * @returns {JSX.Element} The home page UI.
 */
export default function Home({ loading = false, error = null }) {
  return (
    <>
      {/* FILTER & SORT CONTROLS */}
      <Container />

      {/* LOADING STATE */}
      {loading && (
        <div className="message-container">
          <div className="spinner"></div>
          <p className="loading">Loading podcasts...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && (
        <div className="message-container">
          <div className="error">
            Error occurred while fetching podcasts: {error}
          </div>
        </div>
      )}

      {/* PODCAST GRID */}
      {!loading && !error && <PodcastGrid podcasts={[]} genres={genres} />}

      {/* PAGINATION CONTROLS */}
      <Pagination />
    </>
  );
}
