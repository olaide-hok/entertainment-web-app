'use client';

import Link from 'next/link';
import {useActionState, useEffect, useState} from 'react';
import {useFormStatus} from 'react-dom';
import {signUpUser} from '@/lib/actions';
import {redirect} from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import {generateNameFromEmail} from '@/lib/utils';

const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: '',
    });

    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!signupForm.email.trim()) newErrors.email = "Can't be empty";
        if (!signupForm.password.trim()) newErrors.password = "Can't be empty";
        if (!signupForm.repeatPassword.trim())
            newErrors.repeatPassword = "Can't be empty";
        if (signupForm.password !== signupForm.repeatPassword)
            newErrors.repeatPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isErrorEmail = errors.email
        ? 'border-b-(--clr-red-500)'
        : 'border-b-(--clr-blue-500)';
    const isErrorPassword = errors.password
        ? 'border-b-(--clr-red-500)'
        : 'border-b-(--clr-blue-500)';
    const isErrorRepeatPassword = errors.repeatPassword
        ? 'border-b-(--clr-red-500)'
        : 'border-b-(--clr-blue-500)';

    const handleSignup = () => {
        if (!validateForm()) {
            return;
        }

        const randomName = generateNameFromEmail(signupForm.email);
        const fullName = `${randomName.firstName} ${randomName.lastName}`;

        const formData = new FormData();
        formData.append('name', fullName);
        formData.append('email', signupForm.email);
        formData.append('password', signupForm.password);
        formData.append('repeatPassword', signupForm.repeatPassword);

        action(formData);
    };

    const SignUpButton = () => {
        const {pending} = useFormStatus();

        return (
            <Button
                variant="secondary"
                type="submit"
                disabled={pending}
                className={`${
                    pending ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                name={
                    pending ? 'Creating your account...' : 'Create an account'
                }
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
                {data && data.success && (
                    <div className="form-message success-message">
                        {data.message}
                    </div>
                )}
                {data && !data.success && data.message !== '' ? (
                    <div className="text-(--clr-red-500)">{data.message}</div>
                ) : (
                    ''
                )}
                <form
                    action={handleSignup}
                    className="flex flex-col gap-y-(--space-500) ">
                    <h1 className="text-(length:--fs-32) font-light">
                        Sign Up
                    </h1>
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
                                value={signupForm.email}
                                onChange={(e) =>
                                    setSignupForm((prev) => ({
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
                                value={signupForm.password}
                                onChange={(e) =>
                                    setSignupForm((prev) => ({
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
                        {/* Repeat Password */}
                        <div className="relative">
                            <label
                                htmlFor="repeat password"
                                className="sr-only">
                                Repeat Password
                            </label>
                            <input
                                className={`block placeholder:text-(--clr-white)/50 text-(length:--fs-15) pl-(--space-200) w-full text-(--clr-white) pb-(--space-200) focus:outline-none border-b-2 ${isErrorRepeatPassword} focus:border-b-(--clr-white) caret-(--clr-red-500)`}
                                type="password"
                                placeholder="Repeat Password"
                                name="repeat password"
                                value={signupForm.repeatPassword}
                                onChange={(e) =>
                                    setSignupForm((prev) => ({
                                        ...prev,
                                        repeatPassword: e.target.value,
                                    }))
                                }
                            />
                            <span
                                className={` ${
                                    errors.repeatPassword ? '' : 'hidden'
                                } absolute top-0 right-0 text-(length:--fs-13) text-(--clr-red-500)`}>
                                {errors.repeatPassword}
                            </span>
                        </div>
                    </div>
                    <SignUpButton />
                </form>
                <p className="text-(length:--fs-15) text-(--clr-white) font-light leading-(--lh-125) text-center">
                    Already have an account?{' '}
                    <Link className="text-(--clr-red-500)" href="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;
