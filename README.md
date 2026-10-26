# Celebrare Photo Gallery

A React + Vite + Tailwind CSS photo gallery assignment built from scratch.

## Features

- Fetches 30 photos from the Picsum Photos API
- Loading and error states
- Responsive layout: 1 column on mobile, 2 on tablet, 4 on desktop
- Live author-name search without additional API requests
- Favourites managed with `useReducer`
- Favourites persist in `localStorage`
- `useFetchPhotos` custom hook
- `useCallback` for the search handler and favourite action
- `useMemo` for filtered photos

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build check

```bash
npm run build
```

## Before submitting

1. Test loading, search, favourites, and refresh persistence.
2. Check the layout at mobile, tablet, and desktop widths.
3. Push this project to a public GitHub repository.
4. Record a 5-minute explanation of the app and code.
5. Submit both links using the form shared by the recruiter.

Be sure you understand each part of the code and can explain it in your own words.
