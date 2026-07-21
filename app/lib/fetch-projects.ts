import { headers } from 'next/headers';

import type { Project } from './projects-db';

type ProjectType = Project['type'];

async function getBaseUrl() {
  const requestHeaders = await headers();
  const host = requestHeaders.get('host');
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';

  if (!host) {
    throw new Error('Unable to determine request host');
  }

  return `${protocol}://${host}`;
}

export async function fetchProjects(type?: ProjectType): Promise<Project[]> {
  const url = new URL('/api/projects', await getBaseUrl());

  if (type) {
    url.searchParams.set('type', type);
  }

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status}`);
  }

  return response.json();
}