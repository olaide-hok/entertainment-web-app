'use client';

import SearchBar from '@/components/SearchBar';
import FilmTile from '@/components/FilmTile';
import {useFilmStore} from '@/store/filmStore';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import TrendingFilmTile from '@/components/TrendingFilmTile';

const HomePage = () => {
    const {recommendedForYou, trendingFilms} = useFilmStore();

    return (
        <div className="flex flex-col px-(--space-200) md:px-0 gap-y-(--space-300)">
            <SearchBar placeholderText="Search for movies or TV series" />
            {/* Trending */}
            <div className="flex flex-col gap-y-(--space-200) max-w-[77.5rem]">
                <h1 className="text-(length:--fs-20) md:text-(length:--fs-32) text-(--clr-white) font-light leading-(--lh-125) trailing-(--ls-3) md:trailing-(--ls-5)">
                    Trendings
                </h1>

                <div>
                    <Carousel className="w-full h-full">
                        <CarouselContent className="-ml-(--space-200) xl:-ml-(--space-500)">
                            {trendingFilms.map((trendingFilm, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-(--space-200) lg:pl-(--space-500) basis-[75%] lg:basis-auto">
                                    <TrendingFilmTile
                                        title={trendingFilm.title}
                                        year={trendingFilm.year}
                                        category={trendingFilm.category}
                                        rating={trendingFilm.rating}
                                        thumbnail={trendingFilm.thumbnail}
                                        isBookmarked={trendingFilm.isBookmarked}
                                        isTrending={trendingFilm.isTrending}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
            {/* Recommended for you */}
            <div className="flex flex-col gap-y-(--space-300) max-w-[77.5rem]">
                <h2 className="text-(length:--fs-20) md:text-(length:--fs-32) text-(--clr-white) font-light leading-(--lh-125) trailing-(--ls-3) md:trailing-(--ls-5)">
                    Recommended for you
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-(--space-200) md:gap-x-(--space-400) md:gap-y-(--space-300) gap-x-(--space-200) xl:gap-x-(--space-500)">
                    {recommendedForYou.map((movie, index) => (
                        <FilmTile
                            key={movie.title + index}
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

export default HomePage;
