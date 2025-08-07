'use client';

import FilmTile from '@/components/FilmTile';
import SearchBar from '@/components/SearchBar';
import {useFilmStore} from '@/store/filmStore';

const Movies = () => {
    const {movies} = useFilmStore();

    return (
        <div className="flex flex-col gap-y-(--space-500)">
            <SearchBar placeholderText="Search for movies" />
            <div className="flex flex-col gap-y-(--space-400)">
                <h2 className="text-(length:--fs-32) text-(--clr-white) font-light leading-(--lh-125) trailing-(--ls-5)">
                    Movies
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-(--space-200) md:gap-y-(--space-300) gap-x-(--space-200) lg:gap-x-(--space-500)">
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
        </div>
    );
};

export default Movies;
