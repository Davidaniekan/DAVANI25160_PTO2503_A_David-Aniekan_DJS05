/**
 * @function fetchPodcasts
 * Asynchronously fetches podcast data from the remote API and updates state accordingly.
 * Handles loading, error, and successful data response via provided state setters.
 *
 * @param {Function} setPodcasts - State setter function to update the podcasts array.
 * @param {Function} setError - State setter function to update the error message (string).
 * @param {Function} setLoading - State setter function to toggle the loading state (boolean).
 *
 * @returns {Promise<void>} A promise that resolves when the fetch process completes.
 **/
export async function fetchPodcasts(setPodcast, setError, setLoading) {
  try {
    const res = await fetch("https://podcast-api.netlify.app/");
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    setPodcast(data);
  } catch (err) {
    console.error("Failed to fetch podcasts:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

/**
 * Fetches a single podcast/show by ID from the API and updates state.
 *
 * @param {string|number} id - The show ID (route parameter).
 * @param {Function} setPodcast - State setter for the show data.
 * @param {Function} setError - State setter for error message.
 * @param {Function} setLoading - State setter for loading flag.
 * @returns {Promise<void>}
 */
export async function fetchSinglePodcast(id, setPodcast, setError, setLoading) {
  try {
    const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    setPodcast(data);
  } catch (err) {
    console.error(`Failed to fetch podcast with id ${id}:`, err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}