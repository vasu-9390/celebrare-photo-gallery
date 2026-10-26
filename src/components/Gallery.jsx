import { useCallback, useMemo, useReducer, useState, useEffect } from "react";
import { Search, Image as ImageIcon, Heart, X, RefreshCw } from "lucide-react";
import useFetchPhotos from "../hooks/useFetchPhotos.js";
import PhotoCard from "./PhotoCard.jsx";
import { favoritesReducer, readSavedFavorites } from "../reducers/favoritesReducer.js";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, dispatch] = useReducer(favoritesReducer, undefined, readSavedFavorites);

  useEffect(() => {
    try {
      localStorage.setItem("celebrare-favorite-ids", JSON.stringify(favorites));
    } catch {
      // The gallery remains usable when browser storage is unavailable.
    }
  }, [favorites]);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const toggleFavorite = useCallback((photoId) => {
    dispatch({ type: "TOGGLE_FAVORITE", photoId });
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return photos.filter((photo) => {
      const matchesAuthor = photo.author.toLowerCase().includes(query);
      const matchesFavorite = !showFavoritesOnly || favorites.includes(String(photo.id));
      return matchesAuthor && matchesFavorite;
    });
  }, [photos, searchTerm, showFavoritesOnly, favorites]);

  const favoriteCount = favorites.length;

  return (
    <main className="min-h-screen bg-[#f8f7fb]">
      <header className="border-b border-[#ebe6f2] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="Celebrare Gallery home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7041b4] text-white shadow-lg shadow-purple-200">
              <ImageIcon size={22} />
            </span>
            <span>
              <span className="block text-lg font-extrabold tracking-tight text-[#2b2437]">frame<span className="text-[#7041b4]">folk</span></span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a8cae]">A little visual inspiration</span>
            </span>
          </a>
          <div className="hidden items-center gap-2 rounded-full bg-[#f5f1fa] px-4 py-2 text-xs font-semibold text-[#7041b4] sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Photo collection
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 sm:pt-14">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8057b5]">Discover something beautiful</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#282133] sm:text-5xl">A gallery for your <span className="text-[#8057b5]">curious eye.</span></h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#777080] sm:text-base">Browse a hand-picked stream of moments. Search photographers and save the images you want to come back to.</p>
        </div>

        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-[#e8e2f0] bg-white px-4 shadow-sm transition focus-within:border-[#a88ad1] focus-within:ring-4 focus-within:ring-purple-100">
            <Search size={19} className="shrink-0 text-[#9a8cae]" />
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by photographer name..."
              aria-label="Search photos by author"
              className="w-full bg-transparent text-sm text-[#2b2437] outline-none placeholder:text-[#aaa2b4]"
            />
            {searchTerm && <button type="button" onClick={() => setSearchTerm("")} aria-label="Clear search" className="text-[#9588a5] hover:text-[#4b3867]"><X size={17} /></button>}
          </label>
          <button
            type="button"
            onClick={() => setShowFavoritesOnly((current) => !current)}
            aria-pressed={showFavoritesOnly}
            className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition ${
              showFavoritesOnly ? "border-[#7041b4] bg-[#7041b4] text-white shadow-md shadow-purple-200" : "border-[#e8e2f0] bg-white text-[#655a73] hover:border-[#c8b6e0]"
            }`}
          >
            <Heart size={17} fill={showFavoritesOnly ? "currentColor" : "none"} />
            Favourites <span className={`rounded-full px-2 py-0.5 text-xs ${showFavoritesOnly ? "bg-white/20" : "bg-[#f1ecf7]"}`}>{favoriteCount}</span>
          </button>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-[#82798e]">
            {loading ? "Finding photos..." : `${filteredPhotos.length} ${filteredPhotos.length === 1 ? "photo" : "photos"} ${showFavoritesOnly ? "saved" : "in the collection"}`}
          </p>
          <span className="text-xs text-[#a39aaf]">Updated from Picsum Photos</span>
        </div>

        {loading && (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#dcd2e9] bg-white/70">
            <div className="spinner" role="status" aria-label="Loading photos" />
            <p className="text-sm font-medium text-[#81768f]">Loading your gallery…</p>
          </div>
        )}

        {!loading && error && (
          <div role="alert" className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-rose-100 bg-white p-8 text-center">
            <p className="font-semibold text-rose-700">We couldn’t load the photos.</p>
            <p className="mt-2 max-w-md text-sm text-[#81768f]">{error}</p>
            <p className="mt-3 text-xs text-[#a39aaf]">Check your internet connection and refresh the page to try again.</p>
          </div>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo, index) => (
              <div key={photo.id} style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}>
                <PhotoCard
                  photo={photo}
                  isFavorite={favorites.includes(String(photo.id))}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#dcd2e9] bg-white px-6 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f1ecf8] text-[#8057b5]">
              {showFavoritesOnly ? <Heart size={22} /> : <Search size={22} />}
            </span>
            <h2 className="mt-4 font-bold text-[#30273e]">{showFavoritesOnly ? "No favourites yet" : "No photos found"}</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#82798e]">
              {showFavoritesOnly ? "Tap the heart on any photo to save it here." : "Try another photographer name or clear your search."}
            </p>
            {(searchTerm || showFavoritesOnly) && (
              <button type="button" onClick={() => { setSearchTerm(""); setShowFavoritesOnly(false); }} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#7041b4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5d3298]">
                <RefreshCw size={15} /> Show all photos
              </button>
            )}
          </div>
        )}
        <footer className="mt-12 border-t border-[#e9e3f0] pt-5 text-center text-xs text-[#a097ad]">
          Made for photo lovers <span className="mx-1 text-[#b8a0d8]">•</span> Photos provided by Picsum
        </footer>
      </section>
    </main>
  );
}