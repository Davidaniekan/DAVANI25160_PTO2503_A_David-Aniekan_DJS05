import React, { useContext } from "react";
import { PodcastContext } from "../../PodcastContext.jsx";

/**
 * SortSelect component for sorting podcasts by various criteria.
 *
 * Responsibilities:
 * - Render sort options dropdown
 * - Handle sort key changes
 * - Display all available sorting options from context
 *
 * @component
 * @returns {JSX.Element} Sort select dropdown UI
 */
export function SortSelect() {
  const { sortKey, setSortKey, SORT_OPTIONS } = useContext(PodcastContext);

  /**
   * Handles changes to the sort dropdown.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event
   */
  const onSortChange = (e) => setSortKey(e.target.value);

  return (
    <>
      {/* SORT SELECT */}
      <label htmlFor="sortSelect" id="sort-label">
        Sort:
      </label>
      <select id="sortSelect" value={sortKey} onChange={onSortChange}>
        {/* Render available sort options from context */}
        {SORT_OPTIONS.map((s) => (
          <option key={s.key} value={s.key}>
            {s.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default SortSelect;
