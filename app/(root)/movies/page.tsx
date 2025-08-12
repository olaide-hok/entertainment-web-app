'use client';

import FilmTile from '@/components/FilmTile';
import SearchBar from '@/components/SearchBar';
import {useFilmStore} from '@/store/filmStore';

const Movies = () => {
    const {movies, search, getSearchedFilms} = useFilmStore();
    const searchedFilmResult = getSearchedFilms('Movie');

    return (
        <div className="flex flex-col px-(--space-200) md:px-0 gap-y-(--space-300) md:gap-y-(--space-500) w-full">
            <SearchBar placeholderText="Search for movies" />
            {searchedFilmResult.length > 0 ? (
                <>
                    <h2 className="text-(length:--fs-20) md:text-(length:--fs-32) text-(--clr-white) font-light leading-(--lh-125) trailing-(--ls-3) md:trailing-(--ls-5)">
                        Found {searchedFilmResult.length} results for &apos;
                        {search}&apos;
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-(--space-200) md:gap-x-(--space-400) md:gap-y-(--space-300) gap-x-(--space-200) xl:gap-x-(--space-500)">
                        {searchedFilmResult.map((film) => (
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
                </>
            ) : (
                <>
                    {search.length > 0 && searchedFilmResult.length === 0 ? (
                        <div className="flex flex-col gap-y-(--space-400)">
                            <h2 className="text-(length:--fs-20) md:text-(length:--fs-32) text-(--clr-white) font-light leading-(--lh-125) trailing-(--ls-3) md:trailing-(--ls-5)">
                                No results found in Movies for &apos;{search}
                                &apos;
                            </h2>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-y-(--space-400)">
                            <h2 className="text-(length:--fs-20) md:text-(length:--fs-32) text-(--clr-white) font-light leading-(--lh-125) trailing-(--ls-3) md:trailing-(--ls-5)">
                                Movies
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-(--space-200) md:gap-x-(--space-400) md:gap-y-(--space-300) gap-x-(--space-200) xl:gap-x-(--space-500)">
                                {movies.map((movie) => (
                                    <FilmTile
                                        key={movie.title}
                                        title={movie.title}
                                        year={movie.year}
                                        category={movie.category}
                                        rating={movie.rating}
                                        thumbnail={movie.thumbnail}
                                        isBookmarked={movie.isBookmarked}
                                        isTrending={movie.isTrending}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Movies;
