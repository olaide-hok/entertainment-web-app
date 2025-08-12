'use client';

import {useFilmStore} from '@/store/filmStore';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

interface SearchBarProps {
    placeholderText: string;
}

const SearchBar = ({placeholderText}: SearchBarProps) => {
    const {search, setSearch} = useFilmStore();
    const pathname = usePathname();

    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    // Reset search when route changes
    useEffect(() => {
        setSearch('');
    }, [pathname, setSearch]);

    return (
        <div className="xl:mt-(--space-400)">
            <label className="relative inline-flex w-full" htmlFor="search">
                <Image
                    className="pb-(--space-200)"
                    src="/assets/icon-search.svg"
                    alt="search"
                    unoptimized
                    width={32}
                    height={32}
                />
                <span className="sr-only">Search</span>
                <input
                    className="block placeholder:text-(--clr-white)/50 text-(length:--fs-24) ml-(--space-300) w-full text-(--clr-white)  pb-(--space-200) focus:outline-none focus:border-b-2 focus:border-b-(--clr-blue-500) caret-(--clr-red-500)"
                    type="text"
                    placeholder={placeholderText}
                    name="search"
                    value={search}
                    onChange={(e) => {
                        handleSearchChange(e.target.value);
                    }}
                />
            </label>
        </div>
    );
};

export default SearchBar;
