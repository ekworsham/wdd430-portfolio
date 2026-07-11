"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
];

function isActivePath(pathname: string, href: string) {
    if (href === '/') {
        return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <ul className="flex gap-6">
            {links.map((link) => {
                const active = isActivePath(pathname, link.href);

                return (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            aria-current={active ? 'page' : undefined}
                            className={active ? 'font-semibold underline underline-offset-4' : undefined}
                        >
                            {link.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}