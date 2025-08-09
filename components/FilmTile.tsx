'use client';

import Image from 'next/image';
import SVGIcons from './SVGIcons';
import {useState} from 'react';

import {Film as FilmTileProps} from '@/store/filmStore';

const FilmTile = ({
    title,
    year,
    category,
    rating,
    thumbnail,
    isBookmarked,
}: FilmTileProps) => {
    const [activeIcon, setActiveIcon] = useState<boolean>(isBookmarked);

    const handleBookmark = () => {
        setActiveIcon(!activeIcon);
    };

    return (
        <div className="flex flex-col gap-y-(--space-100)">
            {/* Image */}
            <div className="relative w-full h-[6.875rem] xl:w-[17.5rem] md:h-[8.75rem] xl:h-[10.875rem]">
                <Image
                    className="rounded-(--space-100) object-cover"
                    src={thumbnail.regular.large}
                    alt={title}
                    fill
                />
                <div className="bookmark-svg absolute right-(--space-100) top-(--space-100) md:right-(--space-200) md:top-(--space-200) flex items-center justify-center bg-(--clr-blue-950)/50 cursor-pointer hover:bg-(--clr-white) rounded-full w-(--space-400) h-(--space-400)">
                    <button
                        type="button"
                        className="cursor-pointer"
                        aria-label="bookmark"
                        onClick={handleBookmark}>
                        <SVGIcons
                            name={
                                activeIcon ? `bookmark-full` : `bookmark-empty`
                            }
                            fill=""
                        />
                    </button>
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
