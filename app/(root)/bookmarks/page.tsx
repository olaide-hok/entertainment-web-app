'use client';

import FilmTile from '@/components/FilmTile';
import SearchBar from '@/components/SearchBar';
import {useFilmStore} from '@/store/filmStore';

const Bookmarked = () => {
    const {bookmarked} = useFilmStore();

    return (
        <div className="flex flex-col gap-y-(--space-500) mt-(--space-400)">
            <SearchBar />

            <div className="flex flex-col gap-y-(--space-400)">
                <h2 className="text-(length:--fs-32) text-(--clr-white) font-light leading-(--lh-125) trailing-(--ls-5)">
                    Bookmarked Movies
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-(--space-200) md:gap-y-(--space-300) gap-x-(--space-200) lg:gap-x-(--space-500)">
                    {bookmarked
                        .filter((bookmark) => bookmark.category === 'Movie')
                        .map((film) => (
                            <FilmTile
                                key={film.title}
                                title={film.title}
                                year={film.year}
                                category={film.category}
                                rating={film.rating}
                                thumbnail={film.thumbnail}
                                isBookmarked={film.isBookmarked}
                                isTrending={film.isTrending}
                            />
                        ))}
                </div>
            </div>

            <div className="flex flex-col gap-y-(--space-400)">
                <h2 className="text-(length:--fs-32) text-(--clr-white) font-light leading-(--lh-125) trailing-(--ls-5)">
                    Bookmarked TV Series
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-(--space-200) md:gap-y-(--space-300) gap-x-(--space-200) lg:gap-x-(--space-500)">
                    {bookmarked
                        .filter((bookmark) => bookmark.category === 'TV Series')
                        .map((film) => (
                            <FilmTile
                                key={film.title}
                                title={film.title}
                                year={film.year}
                                category={film.category}
                                rating={film.rating}
                                thumbnail={film.thumbnail}
                                isBookmarked={film.isBookmarked}
                                isTrending={film.isTrending}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Bookmarked;
