export type Film = {
  id: string;
  slug: string;
  title: string;
  year: number;
  runtime: string;
  rating: string;
  director: string;
  cast: string[];
  synopsis: string;
  genres: string[];
  poster: string;
  ogImage: string;
};

export const films: Film[] = [
  {
    id: '1',
    slug: 'lost-stars',
    title: 'Lost Stars',
    year: 2021,
    runtime: '1h 48m',
    rating: '8.1/10',
    director: 'Mara Chen',
    cast: ['Elena Park', 'Micah Stone', 'Ravi Das'],
    synopsis:
      'A drifting pilot and a cartographer race through collapsing constellations to map a safe path home before the night sky disappears forever.',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    poster: '/posters/lost-stars.svg',
    ogImage: '/posters/lost-stars-og.svg'
  },
  {
    id: '2',
    slug: 'neon-tide',
    title: 'Neon Tide',
    year: 2020,
    runtime: '2h 02m',
    rating: '7.6/10',
    director: 'Leo Hart',
    cast: ['Ari Navarro', 'Jonah White', 'Selene Cruz'],
    synopsis:
      'In a floodlit megacity, a forgotten DJ uncovers coded broadcasts that predict disasters and must decide who gets saved.',
    genres: ['Thriller', 'Mystery', 'Cyberpunk'],
    poster: '/posters/neon-tide.svg',
    ogImage: '/posters/neon-tide-og.svg'
  },
  {
    id: '3',
    slug: 'embers-of-aurora',
    title: 'Embers of Aurora',
    year: 2023,
    runtime: '1h 55m',
    rating: '8.7/10',
    director: 'Sofia Klein',
    cast: ['Noor Alvi', 'Luca Moreau', 'Hana Ivers'],
    synopsis:
      'After a volcanic winter, a team of archivists embarks on a trek across frozen seas to reignite a city powered by memory.',
    genres: ['Drama', 'Fantasy', 'Adventure'],
    poster: '/posters/embers-of-aurora.svg',
    ogImage: '/posters/embers-of-aurora-og.svg'
  }
];

export const getFilmBySlug = (slug: string) => films.find((film) => film.slug === slug);
