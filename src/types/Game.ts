export interface Game {
  id: number;
  title: string;
  year: number;
  rank: number;
  minplayers: number;
  maxplayers: number;
  minplaytime: number;
  maxplaytime: number;
  minage: number;
  rating: Rating;
  recommendations: Recommendations;
  types: Types;
  credit: Credit;
  clique?: number;
}

export interface Credit {
  designer: Designer[];
}

export interface Designer {
  id: number;
  name: string;
}

export interface Rating {
  rating: number;
  num_of_reviews: number;
}

export interface Recommendations {
  fans_liked: number[];
}

export interface Types {
  categories: Designer[];
  mechanics: Designer[];
}

export function newGame(): Game {
  return {
    credit: { designer: [] },
    id: 0,
    maxplayers: 0,
    maxplaytime: 0,
    minage: 0,
    minplayers: 0,
    minplaytime: 0,
    rank: 0,
    rating: { rating: 0, num_of_reviews: 0 },
    recommendations: { fans_liked: [] },
    title: '',
    types: { categories: [], mechanics: [] },
    year: 0
  }
}