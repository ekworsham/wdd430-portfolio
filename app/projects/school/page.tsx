import { Suspense } from "react";
import SchoolProjectList from "./SchoolProjectList";
import Loading from "./loading";

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'School Project Page',
};

export default function SchoolProjectsPage() {
  return (
    <main>
      <h1>School Projects</h1>

      <Suspense fallback={<Loading />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}