import {z} from 'zod';

// Schema for logging users in
export const logInFormSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Schema for signing up a user
export const signUpFormSchema = z
    .object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        repeatPassword: z
            .string()
            .min(8, 'Confirm password must be at least 8 characters'),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });
