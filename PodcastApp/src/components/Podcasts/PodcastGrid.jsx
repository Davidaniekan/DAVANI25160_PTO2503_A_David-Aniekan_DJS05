import { useContext } from "react";
import PodcastCard from "./PodcastCard.jsx";
import { PodcastContext } from "../../PodcastContext.jsx";
import { genres as GENRE_LIST } from "../../data.js";

/**
 * PodcastGrid
 * Renders a grid/list of podcasts using `PodcastCard` for each item.
 *
 * If PodcastContext is present it will prefer context-paged results,
 * otherwise fallback to the `podcasts` prop passed directly.
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} [props.podcasts=[]] - Array of podcast objects to render.
 * @param {Array<{id:number,title:string}>} [props.genres=[]] - Array of genre objects to pass down for mapping genre IDs.
 * @returns {JSX.Element} Section element containing the podcast cards or an empty message.
 */
export default function PodcastGrid({ podcasts: fallback = [], genres = [] }) {
  const ctx = useContext(PodcastContext);
  const podcasts = ctx?.podcasts ?? fallback;
  const usedGenres = GENRE_LIST.length ? GENRE_LIST : genres;

  if (!podcasts || podcasts.length === 0) {
    return <p className="empty">No podcasts found.</p>;
  }

  return (
    <section className="podcast-grid" aria-live="polite">
      {podcasts.map((p) => (
        <PodcastCard key={p.id} podcast={p} genres={usedGenres} />
      ))}
    </section>
  );
}
