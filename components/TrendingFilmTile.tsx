import Image from 'next/image';
import SVGIcons from './SVGIcons';
import {useState} from 'react';

import {Film as TrendingFilmTileProps} from '@/store/filmStore';

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
    const handleBookmark = () => {
        setActiveIcon(!activeIcon);
    };

    if (isTrending && thumbnail.trending) {
        return (
            <div className="flex flex-col gap-y-(--space-100)">
                {/* Image */}
                <div className="relative md:w-[29.375rem] md:h-[14.375rem]">
                    <Image
                        className="rounded-(--space-100) object-cover"
                        src={thumbnail?.trending?.large}
                        alt={title}
                        fill
                    />
                    <div className="absolute flex flex-col justify-between h-full w-full px-(--space-300) py-(--space-200)">
                        <div className="bookmark-svg flex items-center justify-center bg-(--clr-blue-950)/50 cursor-pointer hover:bg-(--clr-white) rounded-full w-(--space-400) h-(--space-400)">
                            <button
                                type="button"
                                className="cursor-pointer"
                                aria-label="bookmark"
                                onClick={handleBookmark}>
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
