import ProjectList from '../../../components/projectList';

import { fetchProjects } from '../../lib/fetch-projects';

export default async function OpenSourceProjectsPage() {
    const projects = await fetchProjects('opensource');

    return <ProjectList projects={projects} />;
}
