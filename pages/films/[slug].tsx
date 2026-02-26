import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '@/components/Layout';
import { Film, films, getFilmBySlug } from '@/data/films';

type FilmPageProps = {
  film: Film;
  relatedFilms: Film[];
};

export default function FilmDetailPage({
  film,
  relatedFilms
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const canonical = `https://example.com/films/${film.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: film.title,
    image: `https://example.com${film.ogImage}`,
    datePublished: `${film.year}`,
    genre: film.genres,
    director: {
      '@type': 'Person',
      name: film.director
    },
    actor: film.cast.map((name) => ({
      '@type': 'Person',
      name
    })),
    description: film.synopsis,
    duration: film.runtime
  };

  return (
    <Layout>
      <Head>
        <title>{film.title} | Lost Stars Studio</title>
        <meta name="description" content={film.synopsis} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${film.title} | Lost Stars Studio`} />
        <meta property="og:description" content={film.synopsis} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`https://example.com${film.ogImage}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <article className="mx-auto w-full max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm text-violet-300 hover:text-violet-200">
          ← Back to Home
        </Link>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-xl border border-slate-700">
            <Image
              src={film.poster}
              alt={`${film.title} poster`}
              fill
              sizes="(max-width: 768px) 90vw, 320px"
              className="object-cover"
            />
          </div>

          <div className="space-y-5">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold text-white sm:text-4xl">{film.title}</h1>
              <p className="text-slate-300">
                {film.year} · {film.runtime} · <span className="text-violet-300">{film.rating}</span>
              </p>
            </header>

            <p className="text-body-base text-slate-200">{film.synopsis}</p>

            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-slate-100">Director</dt>
                <dd className="text-slate-300">{film.director}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-100">Genres</dt>
                <dd className="text-slate-300">{film.genres.join(', ')}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-slate-100">Cast</dt>
                <dd className="text-slate-300">{film.cast.join(', ')}</dd>
              </div>
            </dl>

            <section aria-label="Video trailer placeholder" className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Trailer</h2>
              <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-900 text-slate-400">
                Video / embed placeholder
              </div>
            </section>
          </div>
        </div>

        <section aria-labelledby="related-films" className="space-y-4 border-t border-slate-800 pt-8">
          <h2 id="related-films" className="text-xl font-semibold text-white">
            Related Films
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {relatedFilms.map((related) => (
              <li key={related.id}>
                <Link
                  href={`/films/${related.slug}`}
                  className="block rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-slate-300 transition hover:border-violet-500 hover:text-violet-200"
                >
                  {related.title} ({related.year})
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: films.map((film) => ({ params: { slug: film.slug } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<FilmPageProps> = async ({ params }) => {
  const slug = params?.slug;
  const film = typeof slug === 'string' ? getFilmBySlug(slug) : undefined;

  if (!film) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      film,
      relatedFilms: films.filter((item) => item.slug !== film.slug).slice(0, 3)
    }
  };
};
