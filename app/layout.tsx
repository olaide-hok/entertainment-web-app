import type {Metadata} from 'next';
import {Outfit} from 'next/font/google';
import './globals.css';
import {AuthProviders} from '@/components/providers';

const outfitSans = Outfit({
    variable: '--ff-outfit',
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'An Entertainment App',
    description: 'An entertainment web app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfitSans.variable} antialiased`}>
                <AuthProviders>{children}</AuthProviders>
            </body>
        </html>
    );
}
