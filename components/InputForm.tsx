'use client';
import {useState} from 'react';

const InputForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const isError =
        error === true
            ? 'border-b-(--clr-red-500)'
            : 'border-b-(--clr-blue-500)';
    return (
        <div className="relative w-[21rem] h-[2.3125rem]">
            <label className="sr-only">Email address</label>
            <input
                className={`block placeholder:text-(--clr-white)/50 text-(length:--fs-15) pl-(--space-200) w-full text-(--clr-white) pb-[22.4px] focus:outline-none border-b-2 ${isError} focus:border-b-(--clr-white) caret-(--clr-red-500)`}
                type="text"
                placeholder="Email address"
                name="email"
                value={email}
            />
            <span
                className={` ${
                    error ? '' : 'hidden'
                } absolute top-0 right-0 text-(length:--fs-13) text-(--clr-red-500)`}>
                Can&apos;t be empty
            </span>
        </div>
    );
};

export default InputForm;
