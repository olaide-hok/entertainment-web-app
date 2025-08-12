'use client';

import Image from 'next/image';
import SVGIcons from './SVGIcons';
import {useState} from 'react';

import {Film as FilmTileProps, useFilmStore} from '@/store/filmStore';

const FilmTile = ({
    title,
    year,
    category,
    rating,
    thumbnail,
    isBookmarked,
}: FilmTileProps) => {
    const [activeIcon, setActiveIcon] = useState<boolean>(isBookmarked);
    const {toggleBookmark} = useFilmStore();

    const handleBookmark = (title: string) => {
        setActiveIcon(!activeIcon);
        toggleBookmark(title);
    };

    return (
        <div className="flex flex-col gap-y-(--space-100)">
            {/* Image */}
            <div className="relative w-full h-[6.875rem] xl:w-[17.5rem] md:h-[8.75rem] xl:h-[10.875rem] cursor-pointer">
                <Image
                    className="rounded-(--space-100) object-cover"
                    src={thumbnail.regular.large}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div className="overlay-tile absolute flex flex-col justify-between h-full w-full">
                    <div className="bookmark-svg absolute right-(--space-100) top-(--space-100) md:right-(--space-200) md:top-(--space-200) flex items-center justify-center bg-(--clr-blue-950)/50 cursor-pointer hover:bg-(--clr-white) rounded-full w-(--space-400) h-(--space-400)">
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

                    <div className="thumbnail bg-(--clr-white)/25 absolute rounded-[1.7813rem] w-[7.3125rem] h-[3rem] hidden items-center self-center gap-x-(--space-200) p-[0.5625rem] transform translate-y-[140%] translate-x-0">
                        <SVGIcons name="icon-play" fill="#ffffff" />

                        <span className="text-(length:--fs-18) text-(--clr-white) leading-(--lh-125) font-medium">
                            Play
                        </span>
                    </div>
                </div>
            </div>
            {/* Details */}
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
    );
};

export default FilmTile;
