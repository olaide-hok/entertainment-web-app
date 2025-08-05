import Image from 'next/image';

const SearchBar = () => {
    return (
        <form>
            <label className="relative inline-flex " htmlFor="search">
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
                    className="block placeholder:text-(--clr-white)/50 text-(length:--fs-24) ml-(--space-300)  w-full text-(--clr-white)  pb-(--space-200) focus:outline-none focus:border-b-2 focus:border-b-(--clr-blue-500) caret-(--clr-red-500)
                "
                    type="text"
                    placeholder="Search for movies or TV series"
                    name="search"
                />
            </label>
        </form>
    );
};

export default SearchBar;
