import Navbar from '@/components/Navbar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="container justify-self-center flex flex-col h-full justify-center gap-y-(--space-300) md:gap-y-(--space-400) xl:gap-y-[4.3125rem] gap-x-[2.25rem] xl:flex-row lg:pl-(--space-400) lg:mt-(--space-400) mb-[4.3125rem]">
            <Navbar />
            {children}
        </main>
    );
}
