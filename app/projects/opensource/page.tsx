import ProjectList from '../../../components/projectList';
import { fetchProjects } from '../../lib/fetch-projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Source',
};

export default async function OpenSourceProjectsPage() {
    const projects = await fetchProjects('opensource');

    return <ProjectList projects={projects} />;
}
