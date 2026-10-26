import { Heart, ExternalLink } from "lucide-react";

export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  const imageUrl = `https://picsum.photos/id/${photo.id}/700/520`;

  return (
    <article className="photo-card group overflow-hidden rounded-2xl border border-[#ece8f2] bg-white shadow-[0_5px_22px_rgba(37,24,59,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(37,24,59,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#efedf4]">
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = photo.download_url;
          }}
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={isFavorite ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border shadow-sm backdrop-blur transition ${
            isFavorite
              ? "border-rose-100 bg-white text-rose-500"
              : "border-white/70 bg-white/90 text-[#726b7e] hover:text-rose-500"
          }`}
        >
          <Heart size={19} fill={isFavorite ? "currentColor" : "none"} strokeWidth={2.2} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#9a8cae]">Photographer</p>
          <h2 className="mt-1 truncate text-sm font-semibold text-[#2b2437]">{photo.author}</h2>
        </div>
        <a
          href={photo.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${photo.author}'s photo page`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[#8b7c9f] transition hover:bg-[#f3eff9] hover:text-[#7041b4]"
        >
          <ExternalLink size={17} />
        </a>
      </div>
    </article>
  );
}