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

    search: string;

    trendingFilms: Film[];
    movies: Film[];
    tvSeries: Film[];
    setSearch: (text: string) => void;
    getSearchedFilms: (page: string) => Film[];
    bookmarked: Film[];
    recommendedForYou: Film[];
    toggleBookmark: (title: string) => void;
}

export const useFilmStore = create<FilmStoreState>((set, get) => ({
    films: data,
    search: '',
    trendingFilms: data.filter((film) => film.isTrending),
    movies: data.filter((film) => film.category === 'Movie'),
    tvSeries: data.filter((film) => film.category === 'TV Series'),

    setSearch: (text) => {
        set({search: text});
    },

    getSearchedFilms(page) {
        const {search, films} = get();

        if (!search.trim()) return []; // Return nothing if search is empty

        if (page === 'all') {
            return films.filter((film) =>
                film.title.toLowerCase().includes(search.toLowerCase())
            );
        } else if (page === 'Movie') {
            return films
                .filter((film) => film.category === 'Movie')
                .filter((film) =>
                    film.title.toLowerCase().includes(search.toLowerCase())
                );
        } else if (page === 'TV Series') {
            return films
                .filter((film) => film.category === 'TV Series')
                .filter((film) =>
                    film.title.toLowerCase().includes(search.toLowerCase())
                );
        } else if (page === 'Bookmarked') {
            return films
                .filter((film) => film.isBookmarked)
                .filter((film) =>
                    film.title.toLowerCase().includes(search.toLowerCase())
                );
        }

        return [];
    },
    bookmarked: data.filter((film) => film.isBookmarked),
    // add or remove to bookmarks
    toggleBookmark(title: string) {
        const {films} = get();
        const film = films.find((film) => film.title === title);
        if (film) {
            if (film.isBookmarked) {
                set((state) => ({
                    bookmarked: state.bookmarked.filter(
                        (bookmark) => bookmark.title !== title
                    ),
                }));
            } else {
                set((state) => ({
                    bookmarked: [...state.bookmarked, film],
                }));
            }
            film.isBookmarked = !film.isBookmarked;
        }
    },
    recommendedForYou: data.filter((film) => !film.isTrending),
}));
