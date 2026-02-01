import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import podcastIcon from "../../assets/podcast-icon.svg";
import userProfile from "../../assets/user-profile.svg";
import { PodcastContext } from "../../PodcastContext.jsx";
import { SearchBar } from "../Filters/SearchBar.jsx";

/**
 * Header
 * Top-level application header component.
 *
 * Responsibilities:
 * - Display application branding (logo and name)
 * - Display the search bar component
 * - Display user profile avatar
 * - Handle logo click to reset filters and navigate home
 *
 * @returns {JSX.Element} Header UI component.
 */
export function Header() {
  const { setSearch, setSortKey, setGenre, setPage } =
    useContext(PodcastContext);
  const navigate = useNavigate();

  /* Navigates to home page and resets all filters when the logo is clicked. */
  const handleLogoClick = () => {
    setSearch(""); // Clear search input
    setSortKey("date-desc");
    setGenre("all");
    setPage(1);
    navigate("/", { replace: true }); // Navigate to home with page refresh behavior
  };

  return (
    <header>
      <div className="header-left">
        <img
          src={podcastIcon}
          alt="podcast logo"
          className="podcast-icon"
          id="podcastIcon"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleLogoClick();
            }
          }}
        />
        <span className="app-name">PodcastApp</span>
      </div>

      <div className="header-right">
        <SearchBar />

        {/* Placeholder profile picture */}
        <img src={userProfile} alt="Profile Picture" className="profile-pic" />
      </div>
    </header>
  );
}
