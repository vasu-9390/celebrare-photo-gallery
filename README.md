# Celebrare Photo Gallery

A responsive photo gallery web application built with **React, Vite, and Tailwind CSS** as part of the Celebrare Frontend React Intern pre-screening assignment.

## ✨ Features

- **Photo Gallery:** Fetches 30 photos from the Picsum Photos API.
- **Loading State:** Displays a spinner while photos are loading.
- **Error Handling:** Shows an error message if the API request fails.
- **Responsive Design:** Displays four columns on desktop, two on tablet, and one on mobile.
- **Live Search:** Filters photos by photographer name without making additional API requests.
- **Favourites:** Add or remove photos using the heart button.
- **Persistent Favourites:** Saves favourite photo IDs in browser `localStorage`.
- **Custom Hook:** Uses `useFetchPhotos` to manage fetching, loading, and error states.
- **Reducer State Management:** Uses React's `useReducer` to manage favourites.
- **Performance Optimization:** Uses `useCallback` for event handlers and `useMemo` for filtered photo results.

## 🛠️ Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript (ES Modules)
- Lucide React
- Picsum Photos API
- Browser localStorage

## 📁 Project Structure

```text
celebrare-gallery/
├── public/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx
│   │   └── PhotoCard.jsx
│   ├── hooks/
│   │   └── useFetchPhotos.js
│   ├── reducers/
│   │   └── favoritesReducer.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/vasu-9390/celebrare-photo-gallery.git
```

### 2. Navigate to the project directory

```bash
cd celebrare-photo-gallery
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🖼️ API

The application fetches photos from the Picsum Photos API:

```text
https://picsum.photos/v2/list?limit=30
```

The API provides photo information, including the photo ID, author, and image URLs.

## 🧠 React Concepts Demonstrated

- **useEffect:** Fetches photos when the custom hook mounts.
- **Custom Hooks:** Separates API fetching logic from the gallery UI.
- **useReducer:** Manages adding and removing favourite photos.
- **useCallback:** Memoizes event handlers.
- **useMemo:** Memoizes the filtered photo list.
- **localStorage:** Persists favourites across browser refreshes.
- **Conditional Rendering:** Displays loading, error, empty, and success states.

## 🧪 Production Build

To check whether the application builds successfully, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

## 📋 Assignment Submission

This project was created for the Celebrare Frontend React Internship pre-screening assignment.

- **GitHub Repository:** https://github.com/vasu-9390/celebrare-photo-gallery
- **Screen Recording:** Add your recording link here after uploading it.
- **Hardest Part:** Managing favourites with `useReducer` and persisting them in `localStorage` while keeping the gallery synchronized.

## 👨‍💻 Author

**Vasu Bandaru**

GitHub: [@vasu-9390](https://github.com/vasu-9390)

---

Built with React and Tailwind CSS.
