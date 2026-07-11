import Link from 'next/link';

export default function ProjectsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="mx-auto max-w-4xl px-4 py-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Projects</h1>
                    <p className="text-sm text-gray-600">Browse project content and settings.</p>
                </div>

                <nav aria-label="Projects section" className="flex gap-4 text-sm font-medium">
                    <Link href="/projects" className="text-blue-600 hover:underline">
                        Projects
                    </Link>
                    <Link href="/projects/settings" className="text-blue-600 hover:underline">
                        Settings
                    </Link>
                </nav>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">{children}</div>
        </section>
    );
}