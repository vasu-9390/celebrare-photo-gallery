export function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      const photoId = String(action.photoId);
      const next = new Set(state);
      if (next.has(photoId)) next.delete(photoId);
      else next.add(photoId);
      return [...next];
    }
    case "CLEAR_FAVORITES":
      return [];
    default:
      return state;
  }
}

export function readSavedFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem("celebrare-favorite-ids") || "[]");
    return Array.isArray(saved) ? saved.map(String) : [];
  } catch {
    return [];
  }
}