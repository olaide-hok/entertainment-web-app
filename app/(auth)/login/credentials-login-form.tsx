'use client';

import Button from '@/components/Button';
import {logInWithCredentials} from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {useActionState, useEffect, useState} from 'react';
import {useFormStatus} from 'react-dom';

const CredentialsLoginForm = () => {
    const [data, action] = useActionState(logInWithCredentials, {
        success: false,
        message: '',
    });

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!loginForm.email.trim()) newErrors.email = 'Email is required';
        if (!loginForm.password.trim())
            newErrors.password = 'Password is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isErrorEmail = errors.email
        ? 'border-b-(--clr-red-500)'
        : 'border-b-(--clr-blue-500)';
    const isErrorPassword = errors.password
        ? 'border-b-(--clr-red-500)'
        : 'border-b-(--clr-blue-500)';

    const handleLogin = () => {
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('email', loginForm.email);
        formData.append('password', loginForm.password);

        action(formData);
    };

    const SignInButton = () => {
        const {pending} = useFormStatus();
        return (
            <Button
                variant="secondary"
                type="submit"
                disabled={pending}
                className={`${
                    pending ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                name={pending ? 'Logging In...' : 'Login to your account'}
            />
        );
    };

    useEffect(() => {
        if (data?.success && data?.redirectTo) {
            setTimeout(() => {
                redirect(data.redirectTo);
            }, 3000);
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center gap-y-(--space-1000) mt-[4.9rem]">
            <Image
                src="/assets/logo.svg"
                alt="logo"
                className="w-auto h-auto"
                width={32}
                height={24}
            />
            <div className="flex flex-col gap-y-(--space-300) p-(--space-400) bg-(--clr-blue-900) rounded-[1.25rem]">
                {data && !data.success && data.message !== '' ? (
                    <div className="text-(--clr-red-500)">{data.message}</div>
                ) : (
                    ''
                )}
                {data && data.success && (
                    <div className="form-message success-message">
                        {data.message}
                    </div>
                )}

                <form
                    action={handleLogin}
                    className="flex flex-col gap-y-(--space-500) ">
                    <h1 className="text-(length:--fs-32) font-light">Login</h1>
                    <div className="flex flex-col gap-y-(--space-300) w-[17.4rem]">
                        {/* Email Address */}
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                className={`block placeholder:text-(--clr-white)/50 text-(length:--fs-15) pl-(--space-200) w-full text-(--clr-white) pb-(--space-200) focus:outline-none border-b-2 ${isErrorEmail} focus:border-b-(--clr-white) caret-(--clr-red-500)`}
                                type="email"
                                placeholder="Email address"
                                name="email"
                                value={loginForm.email}
                                onChange={(e) =>
                                    setLoginForm((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                            />
                            <span
                                className={` ${
                                    errors.email ? '' : 'hidden'
                                } absolute top-0 right-0 text-(length:--fs-13) text-(--clr-red-500)`}>
                                Can&apos;t be empty
                            </span>
                        </div>
                        {/* Password */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                className={`block placeholder:text-(--clr-white)/50 text-(length:--fs-15) pl-(--space-200) w-full text-(--clr-white) pb-(--space-200) focus:outline-none border-b-2 ${isErrorPassword} focus:border-b-(--clr-white) caret-(--clr-red-500)`}
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={loginForm.password}
                                onChange={(e) =>
                                    setLoginForm((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                            />
                            <span
                                className={` ${
                                    errors.password ? '' : 'hidden'
                                } absolute top-0 right-0 text-(length:--fs-13) text-(--clr-red-500)`}>
                                Can&apos;t be empty
                            </span>
                        </div>
                    </div>
                    <SignInButton />
                </form>
                <p className="text-(length:--fs-15) text-(--clr-white) font-light leading-(--lh-125) text-center">
                    Don&apos;t have an account?{' '}
                    <Link className="text-(--clr-red-500)" href="/signup">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CredentialsLoginForm;
