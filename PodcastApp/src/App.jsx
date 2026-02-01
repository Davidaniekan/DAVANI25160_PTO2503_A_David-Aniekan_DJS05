import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/UI/Header.jsx";
import Home from "./pages/Home.jsx";
import ShowDetail from "./pages/ShowDetail.jsx";
import { PodcastProvider } from "./PodcastContext.jsx";
import { fetchPodcasts } from "./api/fetchData.js";
import "./App.css";
import "./index.css";

/**
 * Root React component for the PodcastApp.
 *
 * Responsibilities:
 * - Fetch podcast data from the remote API.
 * - Set up client-side routing for the application.
 * - Wrap app with PodcastProvider for global state management.
 * - Render the Header component globally on all pages.
 * - Define routes for Home and ShowDetail pages.
 *
 * @component
 * @returns {JSX.Element} The application with routing and provider.
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <PodcastProvider initialPodcasts={podcasts}>
      <Header />
      <Routes>
        <Route path="/" element={<Home loading={loading} error={error} />} />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </PodcastProvider>
  );
}
