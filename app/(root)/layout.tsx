import Navbar from '@/components/Navbar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex flex-col h-full md:gap-y-[4.3125rem] gap-x-[2.25rem] md:flex-row pl-(--space-400) mt-(--space-400) mb-[4.3125rem]">
            <Navbar />
            {children}
        </main>
    );
}
