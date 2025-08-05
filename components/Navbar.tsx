'use client';

import Image from 'next/image';
import SVGIcons from './SVGIcons';
import {useState} from 'react';

const Navbar = () => {
    const [activeIcon, setActiveIcon] = useState<string>('nav-home');

    const icons = [
        {name: 'nav-home', label: 'Home'},
        {name: 'nav-movies', label: 'Movies'},
        {name: 'nav-tv-series', label: 'TV Series'},
        {name: 'nav-bookmark', label: 'Bookmarks'},
    ];

    const getFillColor = (iconName: string) => {
        if (iconName === 'nav-home') return '#FFFFFF';
        return iconName === activeIcon ? '#FC4747' : '#5A698F'; // Red if active, gray otherwise
    };

    return (
        <div className="flex flex-col items-center justify-between bg-(--clr-blue-900) rounded-[1.25rem] w-[6rem] px-[1.75rem] py-(--space-200) md:h-[60rem]">
            {/* Logo and NavIcons */}
            <div className="flex flex-col items-center gap-y-(--space-900)">
                <Image
                    className="mx-auto mt-4"
                    src="/assets/logo.svg"
                    alt="logo"
                    width={32}
                    height={32}
                />

                <div className="flex flex-col gap-y-(--space-500)">
                    {icons.map((icon) => (
                        <button
                            type="button"
                            key={icon.name}
                            onClick={() => setActiveIcon(icon.name)}
                            className="hover:opacity-75 transition-opacity cursor-pointer"
                            aria-label={icon.label}>
                            <SVGIcons
                                name={icon.name}
                                fill={getFillColor(icon.name)}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Avatar */}
            <Image
                className="rounded-full mx-auto mt-4"
                src="/assets/image-avatar.png"
                alt="avatar"
                width={32}
                height={32}
            />
        </div>
    );
};

export default Navbar;
