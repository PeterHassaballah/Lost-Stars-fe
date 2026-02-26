import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import FilmCard from '@/components/FilmCard';
import Layout from '@/components/Layout';
import { Film, films } from '@/data/films';

type HomeProps = {
  films: Film[];
};

export default function Home({ films }: HomeProps) {
  const canonical = 'https://example.com/';

  return (
    <Layout>
      <Head>
        <title>Lost Stars Studio | Indie Film Library</title>
        <meta
          name="description"
          content="Discover visionary indie films from Lost Stars Studio, featuring cast details, ratings, and story-rich cinema."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Lost Stars Studio" />
        <meta
          property="og:description"
          content="Explore the Lost Stars film library and behind-the-scenes stories."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://example.com/posters/lost-stars-og.svg" />
      </Head>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Cinematic Stories</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Lost Stars Studio</h1>
          <p className="text-body-base text-slate-300">
            We craft atmospheric films that blend wonder, memory, and human connection.
          </p>
          <Link
            href="#films"
            className="inline-flex rounded-lg bg-violet-500 px-5 py-3 font-semibold text-white hover:bg-violet-400"
          >
            Browse Film Library
          </Link>
        </div>
      </section>

      <section id="about" className="border-y border-slate-800 bg-slate-900/50">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">About Us</h2>
            <p className="text-body-base text-slate-300">
              Lost Stars Studio is an independent crew producing character-led science fiction and
              grounded fantasy. Our team works across continents to build emotionally rich worlds.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4" aria-label="Team photo placeholders">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-700">
              <Image src="/team/team-1.svg" alt="Crew portrait placeholder one" fill className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-700">
              <Image src="/team/team-2.svg" alt="Crew portrait placeholder two" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="films" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Film Library</h2>
          <p className="text-sm text-slate-400">{films.length} featured films</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {films.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-slate-800 bg-slate-900/50">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
            <p className="text-slate-300">
              Reach out for festival bookings, screenings, and collaboration requests.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      films
    }
  };
}
