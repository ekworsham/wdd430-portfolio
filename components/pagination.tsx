'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage =
    Number(searchParams.get('page')) || 1;

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-4">
      <Link
        href={createPageURL(currentPage - 1)}
        aria-disabled={currentPage <= 1}
        className={`rounded-md px-4 py-2 font-medium text-white transition-colors ${
          currentPage <= 1
            ? 'pointer-events-none bg-gray-400'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        Previous
      </Link>

      <span className="rounded-md border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={createPageURL(currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        className={`rounded-md px-4 py-2 font-medium text-white transition-colors ${
          currentPage >= totalPages
            ? 'pointer-events-none bg-gray-400'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        Next
      </Link>
    </nav>
  );
}