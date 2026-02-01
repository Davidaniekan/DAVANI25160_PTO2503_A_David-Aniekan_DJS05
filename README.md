# 🎧 PodcastApp

## 📋 Overview

PodcastApp is a cutting-edge podcast discovery platform built with React 19 and Vite. It provides users with a seamless experience to browse, search, filter, and explore thousands of podcasts from the Podcast Index API. The application features advanced filtering capabilities, intuitive navigation, and a fully responsive design optimized for all devices.

---

## 📝 Project Description

PodcastApp empowers podcast enthusiasts with an intuitive interface for discovering new content. Users can search for their favorite shows, filter by genre, sort by various criteria, and explore detailed podcast information including season and episode navigation. The application leverages React Context API for efficient state management and React Router for smooth client-side navigation.

---

## 🛠️ Technologies Used
- **React** — Component-based architecture for building scalable user interfaces
- **React Context API** — Centralized state management across the application
- **React Router DOM** — Client-side routing for seamless navigation
- **Vite** — High-performance development server and optimized build tool
- **JavaScript (ES6+)** — Modern, standards-based scripting
- **HTML5** — Semantic and accessible markup
- **CSS3** — Responsive and adaptive layout styling
- **Fetch API** — Asynchronous data fetching from external services
- **JSDoc** — Inline documentation for improved code readability and maintainability

---

## ✨ Features

### 🔍 Core Features

- **🌐 Podcast Discovery** - Browse thousands of podcasts from Podcast Index API
- **🔎 Advanced Search** - Find podcasts by title, host, or keywords with real-time filtering
- **🏷️ Genre Filtering** - Filter content by multiple genres simultaneously
- **📊 Smart Sorting** - Order podcasts by popularity, recency, or alphabetically
- **📄 Pagination** - Navigate through large podcast lists efficiently
- **📖 Show Details** - View comprehensive podcast information and metadata
- **🎬 Season Navigation** - Switch between different podcast seasons seamlessly
- **📺 Episode Listings** - Browse episodes within selected seasons
- **📱 Responsive Design** - Perfectly optimized for desktop, tablet, and mobile
- **🌍 Global State Management** - Context API for centralized state handling

---

## 📁 Project Structure

```
🎧 PodcastApp/
├── 📄 index.html                          # Vite HTML entry point
├── 📦 package.json                        # Dependencies and scripts
├── ⚙️  vite.config.js                    # Vite configuration
├── 🔧 eslint.config.js                   # ESLint configuration
│
├── 📁 public/                             # Static assets
│
└── 📁 src/                                # Source code
    ├── 🎨 components/                    # Reusable components
    │   ├── 🔍 Filters/
    │   │   ├── GenreFilter.jsx           # Genre filtering
    │   │   ├── SearchBar.jsx             # Search functionality
    │   │   ├── SortSelect.jsx            # Sorting options
    │   │   └── index.js                  # Component exports
    │   │
    │   ├── 🏗️  Layout/
    │   │   ├── Container.jsx             # Responsive container
    │   │   └── index.js                  # Component exports
    │   │
    │   ├── 🎬 Podcasts/
    │   │   ├── PodcastCard.jsx           # Individual podcast card
    │   │   ├── PodcastGrid.jsx           # Grid layout
    │   │   ├── SeasonNavigation.jsx      # Season selector
    │   │   ├── SeasonNavigation.module.css # Season styles
    │   │   └── index.js                  # Component exports
    │   │
    │   ├── 🖼️  UI/
    │   │   ├── Header.jsx                # App header
    │   │   ├── Pagination.jsx            # Page navigation
    │   │   └── index.js                  # Component exports
    │   │
    │   └── index.js                      # Central exports
    │
    ├── 📄 pages/                         # Page components
    │   ├── Home.jsx                      # Main landing page
    │   ├── ShowDetail.jsx                # Podcast detail page
    │   └── ShowDetail.module.css         # Detail page styles
    │
    ├── 🔌 api/
    │   └── fetchData.js                  # API service calls
    │
    ├── 📝 data.js                        # Mock data & schemas
    ├── 🎯 PodcastContext.jsx             # Global state context
    ├── App.jsx                           # Root app component
    ├── App.css                           # App styles
    ├── main.jsx                          # React entry point
    └── index.css                         # Global styles
📖 README.md                            # This file
```
---

## ⚙️ Setup Instructions

### Installation Steps

#### 1️⃣ Clone or download the project

   ```bash
   git clone https://github.com/Davidaniekan/DAVANI25160_PTO2503_A_David-Aniekan_DJS05.git

   cd podcastApp
   ```

#### 2️⃣ Install dependencies

   ```bash
   npm install
   ```

   This will install all required packages including React, React Router, and Vite.

#### 3️⃣ Start development server

   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:5173` (or the next available port).

---

## 🧭 Usage / Interaction Guide

### 🏠 Home Page (`/`) - Features & Interactions

#### 🔎 Search for Podcasts

1. Locate the search bar at the top of the page
2. Type keywords (podcast name, host, topic)
3. Results filter automatically as you type
4. Clear the field to see all podcasts

**Example:**

```
User types: "Blood"
Results: All podcasts matching "blood" appear
```

#### 🏷️ Filter by Genre

1. Click the **Genre Filter** dropdown
2. Select one or multiple genres
3. Podcast grid updates instantly
4. Combine with search for refined results

**Example:**

```
Genres: History
+ Search: "Rich"
Results: Rich-related podcasts in History categories
```

#### 📊 Sort Podcasts

1. Use the **Sort Select** dropdown
2. Choose sorting preference:
   - **Newest** - Latest updated shows
   - **A-Z** - Alphabetical order
3. Grid reorganizes based on selection

#### 📄 Navigate Pages

1. View pagination controls at the bottom
2. Display shows: "Page 1 of 6"
3. Use Previous/Next buttons for sequential navigation

**Pagination Example:**

```
⬅ Prev  Page 1 of 6  Next ➡
```

### 🎬 Show Detail Page (`/show/:id`) - Features & Interactions

#### 📍 Navigation to Detail Page

1. Browse podcasts on home page
2. Click any **Podcast Card**
3. Routed to `/show/{podcast-id}`
4. Displays detailed podcast information

#### 🎬 Season Navigation

1. Find **Season Selector** component
2. View all available seasons
3. Click to select different season
4. Episode list updates automatically

**Example:**

```
Seasons: [Season 1] [Season 2] [Season 3]
Selected: Season 2
Episodes: (displays all Season 2 episodes)
```

#### 📺 Browse Episodes

1. Selected season displays all episodes
2. Episodes show:
   - Title
   - Description
   - Publication date
   - Duration (if available)
3. Scroll to view all episodes

#### ⬅️ Return to Home

1. Click **Back to Podcasts** button
2. Returns to home page
3. Filters and page position preserved
4. Maintains search/filter state

### 🔗 Advanced Interactions

#### Combining Filters

```
Search: "true Love"
+ Genre: "Fiction"
+ Sort: "Newest"
= Newest documentary-style true love podcasts
```

#### Deep Linking

- Direct URLs work: `/show/9263`
- Share podcast URLs with others
- Browser back button works correctly

#### Responsive Behavior

- **Desktop**: Full-width grid, side-by-side layouts
- **Tablet**: 2-column grid, optimized spacing
- **Mobile**: 1-column layout, touch-friendly controls

---

## 👤 Author

**David Aniekan**
Frontend Developer
[GitHub](https://github.com/Davidaniekan) | [LinkedIn](https://linkedin.com/in/david-aniekan)
