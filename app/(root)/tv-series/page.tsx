'use client';

import FilmTile from '@/components/FilmTile';
import SearchBar from '@/components/SearchBar';
import {useFilmStore} from '@/store/filmStore';

const TVSeries = () => {
    const {tvSeries} = useFilmStore();

    return (
        <div className="flex flex-col px-(--space-200) md:px-0 gap-y-(--space-300) md:gap-y-(--space-400) xl:gap-y-(--space-500)">
            <SearchBar placeholderText="Search for TV series" />
            <div className="flex flex-col gap-y-(--space-400)">
                <h2 className="text-(length:--fs-20) md:text-(length:--fs-32) text-(--clr-white) font-light leading-(--lh-125) trailing-(--ls-3) md:trailing-(--ls-5)">
                    TV Series
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-(--space-200) md:gap-x-(--space-400) md:gap-y-(--space-300) gap-x-(--space-200) xl:gap-x-(--space-500)">
                    {tvSeries.map((series) => (
                        <FilmTile
                            key={series.title}
                            title={series.title}
                            year={series.year}
                            category={series.category}
                            rating={series.rating}
                            thumbnail={series.thumbnail}
                            isBookmarked={series.isBookmarked}
                            isTrending={series.isTrending}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TVSeries;
