import { useContext } from "react";
import { PodcastContext } from "../../PodcastContext";

/**
 * Pagination
 *
 * Displays pagination controls for navigating
 * through paged podcast results.
 *
 * Responsibilities:
 * - Show current page and total page count
 * - Allow navigation to previous and next pages
 * - Hide itself when only one page exists
 *
 * @component
 * @returns {JSX.Element | null} Pagination controls or null if not needed
 */
export function Pagination() {
  const { page, setPage, totalPages } = useContext(PodcastContext);

  /**
   * Do not render pagination controls
   * if there is only one page of results.
   */
  if (totalPages <= 1) return null;

  return (
    /* PAGINATION CONTROLS */
    <div className="pagination" role="navigation" aria-label="Pagination">
      {/* Previous page button */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        aria-label="Go to previous page"
      >
        ⬅ Prev
      </button>

      {/* Current page and total page count */}
      <span>
        Page {page} of {totalPages}
      </span>

      {/* Next page button */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        aria-label="Go to next page"
      >
        Next ➡
      </button>
    </div>
  );
}

export default Pagination;
