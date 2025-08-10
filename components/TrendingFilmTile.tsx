import Image from 'next/image';
import SVGIcons from './SVGIcons';
import {useState} from 'react';

import {Film as TrendingFilmTileProps, useFilmStore} from '@/store/filmStore';

const TrendingFilmTile = ({
    title,
    year,
    category,
    rating,
    thumbnail,
    isBookmarked,
    isTrending,
}: TrendingFilmTileProps) => {
    const [activeIcon, setActiveIcon] = useState<boolean>(isBookmarked);
    const {toggleBookmark} = useFilmStore();

    const handleBookmark = (title: string) => {
        setActiveIcon(!activeIcon);
        toggleBookmark(title);
    };

    if (isTrending && thumbnail.trending) {
        return (
            <div className="trending flex flex-col gap-y-(--space-100) hover:cursor-pointer ">
                {/* Image */}
                <div className="relative w-full h-[8.75rem] md:w-[29.375rem] md:h-[14.375rem]">
                    <Image
                        className="rounded-(--space-100) object-cover"
                        src={thumbnail?.trending?.large}
                        alt={title}
                        fill
                    />
                    <div className="overlay-wrapper absolute flex flex-col justify-between h-full w-full px-(--space-300) py-(--space-200)">
                        <div className="bookmark-svg flex items-center self-end justify-center bg-(--clr-blue-950)/50 cursor-pointer hover:bg-(--clr-white) rounded-full w-(--space-400) h-(--space-400)">
                            <button
                                type="button"
                                className="cursor-pointer"
                                aria-label="bookmark"
                                onClick={() => handleBookmark(title)}>
                                <SVGIcons
                                    name={
                                        activeIcon
                                            ? `bookmark-full`
                                            : `bookmark-empty`
                                    }
                                    fill=""
                                />
                            </button>
                        </div>

                        <div className="thumbnail hidden bg-(--clr-white)/25 absolute rounded-[1.7813rem] w-[7.3125rem] h-[3rem] items-center self-center gap-x-(--space-200) p-[0.5625rem] transform translate-y-[150%] translate-x-0">
                            <SVGIcons name="icon-play" fill="#ffffff" />

                            <span className="text-(length:--fs-18) text-(--clr-white) leading-(--lh-125) font-medium">
                                Play
                            </span>
                        </div>

                        {/* Details */}
                        <div>
                            <div className="flex items-center gap-x-(--space-100) text-(length:--fs-13) text-(--clr-white)/75 font-light leading-(--lh-125)">
                                <span>{year}</span>

                                <div className="flex items-center gap-x-(--space-100)">
                                    <SVGIcons
                                        name="movies"
                                        fill="#ffffff"
                                        styles="opacity-75"
                                    />
                                    <span>{category}</span>
                                </div>
                                <span>{rating}</span>
                            </div>
                            {/* Title */}

                            <p className="text-(length:--fs-18) text-(--clr-white) font-medium leading-(--lh-125)">
                                {title}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default TrendingFilmTile;
