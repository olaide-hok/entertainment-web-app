'use server';

import {logInFormSchema, signUpFormSchema} from './validators';

import {isRedirectError} from 'next/dist/client/components/redirect-error';
import {formatError} from './utils';
import {signIn, signOut} from '@/auth';

// Login the user with credentials
export async function logInWithCredentials(
    prevState: unknown,
    formData: FormData
) {
    try {
        const user = logInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        await signIn('credentials', {
            redirect: false,
            ...user,
        });

        return {
            success: true,
            message: 'Welcome back! Redirecting...',
            redirectTo: '/',
        };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {success: false, message: 'Invalid email or password'};
    }
}

// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            repeatPassword: formData.get('repeatPassword'),
        });

        const registerCredentials = {
            name: user.name,
            email: user.email,
            password: user.password,
        };

        // Register user
        const res = await fetch(`${process.env.NEXT_API_REGISTER_ROUTE}`, {
            method: 'POST',
            body: JSON.stringify(registerCredentials),
            headers: {'Content-Type': 'application/json'},
        });

        const data = await res.json();

        if (res.ok) {
            return {
                success: true,
                message: 'Account created successfully! Welcome!.',
                redirectTo: '/',
            };
        }

        // Handle 404 errors explicitly
        if (res.status === 404) {
            return {
                success: false,
                message: data.error || 'Resource not found.',
            };
        }

        // Handle all other errors with a generic fallback
        return {
            success: false,
            message:
                data.error ||
                'An unexpected error occurred. Please try again later.',
        };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: formatError(error),
        };
    }
}

// Logout
export async function logOutUser() {
    await signOut({
        redirect: true,
        redirectTo: '/login', // navigate to sign-in page
    });
}
