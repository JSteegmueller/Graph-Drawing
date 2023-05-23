export interface Game {
    id:              number;
    title:           string;
    year:            number;
    rank:            number;
    minplayers:      number;
    maxplayers:      number;
    minplaytime:     number;
    maxplaytime:     number;
    minage:          number;
    rating:          Rating;
    recommendations: Recommendations;
    types:           Types;
    credit:          Credit;
}

export interface Credit {
    designer: Designer[];
}

export interface Designer {
    id:   number;
    name: string;
}

export interface Rating {
    rating:         number;
    num_of_reviews: number;
}

export interface Recommendations {
    fans_liked: number[];
}

export interface Types {
    categories: Designer[];
    mechanics:  Designer[];
}
