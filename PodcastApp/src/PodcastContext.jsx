import React, { createContext, useEffect, useState } from "react";

/**
 * @typedef Podcast
 * @property {number} id - Unique identifier
 * @property {string} title - Podcast title
 * @property {string} updated - Last updated ISO date string
 * @property {number[]} genres - Array of genre IDs
 * @property {string} image - URL to podcast artwork
 * @property {number} seasons - Number of seasons
 */
/**
 * Sorting options available to the user for viewing podcasts.
 * @type {{key: string, label: string}[]}
 */
export const SORT_OPTIONS = [
  { key: "default", label: "Default" },
  { key: "date-desc", label: "Newest" },
  { key: "date-asc", label: "Oldest" },
  { key: "title-asc", label: "Title A → Z" },
  { key: "title-desc", label: "Title Z → A" },
];

/**
 * React context for sharing podcast state across components.
 * Must be used within a <PodcastProvider>.
 */
export const PodcastContext = createContext();

/**
 * PodcastProvider component wraps children in a context with state for
 * searching, sorting, filtering, and paginating podcast data.
 * Preserves filter state in localStorage for restored state on navigation.
 *
 * @param {{children: React.ReactNode, initialPodcasts: Podcast[]}} props
 * @returns {JSX.Element}
 */
export function PodcastProvider({ children, initialPodcasts = [] }) {
  const STORAGE_KEY = "podcastFilters";

  /**
   * Load filter state from localStorage or use defaults
   */
  const loadFilterState = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          search: parsed.search || "",
          sortKey: parsed.sortKey || "date-desc",
          genre: parsed.genre || "all",
        };
      }
    } catch (e) {
      console.warn("Failed to load filter state from localStorage:", e);
    }
    return { search: "", sortKey: "date-desc", genre: "all" };
  };

  const initialState = loadFilterState();

  const [search, setSearch] = useState(initialState.search);
  const [sortKey, setSortKey] = useState(initialState.sortKey);
  const [genre, setGenre] = useState(initialState.genre);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /**
   * Persist filter state to localStorage whenever it changes
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ search, sortKey, genre }),
      );
    } catch (e) {
      console.warn("Failed to save filter state to localStorage:", e);
    }
  }, [search, sortKey, genre]);

  /**
   * Dynamically calculate how many cards can fit on screen.
   * Sets a fixed 10 cards for tablet and smaller screens.
   */
  useEffect(() => {
    const calculatePageSize = () => {
      const screenW = window.innerWidth;

      // Tablet and smaller (≤ 1024px): always show 10 cards
      if (screenW <= 1024) {
        setPageSize(10);
        return;
      }

      // For larger screens, calculate based on available width and 2 rows
      const cardWidth = 260;
      const maxRows = 2;
      const columns = Math.floor(screenW / cardWidth);
      const pageSize = columns * maxRows;

      setPageSize(pageSize);
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);
    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  /**
   * Applies the current search query, genre filter, and sort key
   * to the list of podcasts.
   * @returns {Podcast[]} Filtered and sorted podcasts
   */
  const applyFilters = () => {
    let data = [...initialPodcasts];

    // Search filtering
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(q));
    }

    // Genre filtering
    if (genre !== "all") {
      data = data.filter((p) => p.genres.includes(Number(genre)));
    }

    // Sorting logic
    switch (sortKey) {
      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        data.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case "date-desc":
        data.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case "default":
      default:
        break;
    }

    return data;
  };

  /**
   *  Fully filtered and sorted podcast list.
   *  @type {Podcast[]}
   */
  const filtered = applyFilters();
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  // Reset page to 1 when filters change
  const currentPage =
    page > totalPages || (search !== "" && page !== 1) ? 1 : page;

  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Filters and pagination state
  const value = {
    search,
    setSearch,
    sortKey,
    setSortKey,
    genre,
    setGenre,

    page: currentPage,
    setPage,
    totalPages,
    podcasts: paged,
    allPodcastsCount: filtered.length,

    SORT_OPTIONS,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}
