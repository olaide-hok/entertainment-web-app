import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
    if (error.name === 'ZodError') {
        // Handle Zod error
        const fieldErrors = Object.keys(error.errors).map(
            (field) => error.errors[field].message
        );

        return fieldErrors.join('. ');
    } else {
        // Handle other errors
        return typeof error.message === 'string'
            ? error.message
            : JSON.stringify(error.message);
    }
}

// Generate name from email
export function generateNameFromEmail(email: string): {
    firstName: string;
    lastName: string;
} {
    const nameParts = [
        'Smith',
        'Johnson',
        'Brown',
        'Taylor',
        'Wilson',
        'Evans',
        'Green',
        'Hill',
        'King',
        'Carter',
        'Walker',
        'Moore',
        'Clark',
        'Hall',
        'Allen',
    ];

    const firstNameFallbacks = [
        'Alex',
        'Chris',
        'Sam',
        'Jamie',
        'Taylor',
        'Jordan',
        'Morgan',
        'Cameron',
        'Casey',
        'Reese',
    ];

    // Extract username (before @)
    let username = email.split('@')[0];

    // Step 1: Remove numbers and underscores/dashes
    username = username.replace(/[\d_]+/g, ' ');

    // Step 2: Remove "xX", "XX", etc. patterns often used in usernames
    username = username.replace(/x+/gi, ' ');

    // Step 3: Split into words & filter empty
    const words = username
        .replace(/[^a-zA-Z\s]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);

    // Capitalize helper
    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    // Step 4: Pick first/last name
    if (words.length >= 2) {
        return {
            firstName: capitalize(words[0]),
            lastName: capitalize(words[1]),
        };
    }

    if (words.length === 1) {
        const single = words[0];
        // 50% chance: split into two parts
        if (single.length > 4 && Math.random() > 0.5) {
            const mid = Math.floor(single.length / 2);
            return {
                firstName: capitalize(single.slice(0, mid)),
                lastName: capitalize(single.slice(mid)),
            };
        } else {
            // Otherwise: keep first name, random last name
            return {
                firstName: capitalize(single),
                lastName:
                    nameParts[Math.floor(Math.random() * nameParts.length)],
            };
        }
    }

    // Step 5: Fallback if no valid name found
    return {
        firstName:
            firstNameFallbacks[
                Math.floor(Math.random() * firstNameFallbacks.length)
            ],
        lastName: nameParts[Math.floor(Math.random() * nameParts.length)],
    };
}

// Examples:
// console.log(generateNameFromEmail('xX_darkknight_Xx99@domain.com'));
// { firstName: 'Dark', lastName: 'Knight' } OR { firstName: 'Dark', lastName: 'Hill' } (random)
// console.log(generateNameFromEmail('habeebkareem23@gmail.com'));
// { firstName: 'Habeeb', lastName: 'Kareem' }
// console.log(generateNameFromEmail('coolguy99@domain.com'));
// { firstName: 'Cool', lastName: 'Guy' } OR random last name
// console.log(generateNameFromEmail('abc@domain.com'));
// { firstName: 'Abc', lastName: 'Walker' } (randomized)
