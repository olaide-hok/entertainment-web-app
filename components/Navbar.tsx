'use client';

import Image from 'next/image';
import SVGIcons from './SVGIcons';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {logOutUser} from '../lib/actions';
import Button from './Button';

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
        <div className="flex flex-row xl:flex-col items-center xl:justify-between gap-x-[0] bg-(--clr-blue-900) md:rounded-[0.625rem] xl:rounded-[1.25rem] w-full xl:w-[6rem] p-(--space-200) lg:px-[1.75rem] lg:py-(--space-200) xl:h-[60rem]">
            {/* Logo and NavIcons */}
            <div className="flex flex-row justify-between w-full xl:flex-col items-center gap-y-(--space-900)">
                <div className="relative w-[1.5625rem] h-[1.25rem] lg:w-[2rem] lg:h-[2rem]">
                    <Image
                        unoptimized
                        className="h-auto w-auto xl:mt-4"
                        src="/assets/logo.svg"
                        alt="logo"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                    />
                </div>

                <div className="flex flex-row items-center gap-x-(--space-300) md:gap-x-(--space-400) xl:flex-col gap-y-(--space-500)">
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

                <div className="flex gap-x-4 items-center">
                    <Button
                        variant="secondary"
                        className="cursor-pointer p-2 mb-2 xl:hidden"
                        onClick={logOutUser}
                        name="Logout"
                    />

                    {/* Avatar */}
                    <Image
                        className="rounded-full xl:hidden"
                        src="/assets/image-avatar.png"
                        alt="avatar"
                        width={32}
                        height={32}
                    />
                </div>
            </div>

            <div className="flex flex-col items-center">
                <Button
                    variant="secondary"
                    className="cursor-pointer p-2 mb-2 hidden xl:block"
                    onClick={logOutUser}
                    name="Logout"
                />

                {/* Avatar */}
                <Image
                    className="rounded-full hidden xl:block lg:mt-4"
                    src="/assets/image-avatar.png"
                    alt="avatar"
                    width={32}
                    height={32}
                />
            </div>
        </div>
    );
};

export default Navbar;
