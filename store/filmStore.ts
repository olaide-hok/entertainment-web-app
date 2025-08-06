import {create} from 'zustand';
import data from '@/data.json';

export interface Film {
    title: string;
    thumbnail: {
        trending?: {
            small: string;
            large: string;
        };
        regular: {
            small: string;
            medium: string;
            large: string;
        };
    };
    year: number;
    category: string;
    rating: string;
    isBookmarked: boolean;
    isTrending: boolean;
}

interface FilmStoreState {
    films: Film[];
    filters: {
        search: string;
    };
    trendingFilms: Film[];
    movies: Film[];
    tvSeries: Film[];
    getFilteredFilms: () => Film[];
    bookmarked: Film[];
    recommendedForYou: Film[];
}

export const useFilmStore = create<FilmStoreState>((set, get) => ({
    films: data,
    filters: {
        search: '',
    },
    trendingFilms: data.filter((film) => film.isTrending),
    movies: data.filter((film) => film.category === 'Movie'),
    tvSeries: data.filter((film) => film.category === 'TV Series'),

    getFilteredFilms() {
        const {filters} = get();
        return data.filter((film) =>
            film.title.toLowerCase().includes(filters.search.toLowerCase())
        );
    },
    bookmarked: data.filter((film) => film.isBookmarked),
    addToBookmarks(film: Film) {
        set((state) => ({
            bookmarked: [...state.bookmarked, film],
        }));
    },
    recommendedForYou: data.filter((film) => !film.isTrending),
}));
