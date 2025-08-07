'use client';

import Image from 'next/image';
import SVGIcons from './SVGIcons';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const icons = [
        {name: 'nav-home', label: 'Home', href: '/'},
        {name: 'movies', label: 'Movies', href: '/movies'},
        {name: 'tv-series', label: 'TV Series', href: '/tv-series'},
        {name: 'bookmarks', label: 'Bookmarks', href: '/bookmarks'},
    ];

    const getFillColor = (iconHref: string) => {
        if (iconHref === pathname) return '#FFFFFF';
        return '#5A698F'; // Gray otherwise
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
                        <Link
                            key={icon.name}
                            href={icon.href}
                            className="navlink transition-opacity cursor-pointer">
                            <SVGIcons
                                name={icon.name}
                                fill={getFillColor(icon.href)}
                            />
                        </Link>
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
