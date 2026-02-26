import Image from 'next/image';
import Link from 'next/link';
import { Film } from '@/data/films';

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-800 bg-elevated shadow-lg shadow-black/20 transition hover:border-violet-500/60">
      <Link href={`/films/${film.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={film.poster}
            alt={`${film.title} poster`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            priority={false}
          />
        </div>
        <div className="space-y-2 p-4">
          <h3 className="text-lg font-semibold text-slate-100">{film.title}</h3>
          <dl className="grid grid-cols-2 gap-y-1 text-sm text-slate-300">
            <div>
              <dt className="sr-only">Year</dt>
              <dd>{film.year}</dd>
            </div>
            <div>
              <dt className="sr-only">Runtime</dt>
              <dd>{film.runtime}</dd>
            </div>
            <div className="col-span-2">
              <dt className="sr-only">Rating</dt>
              <dd className="font-medium text-violet-300">Rating: {film.rating}</dd>
            </div>
          </dl>
        </div>
      </Link>
    </article>
  );
}
