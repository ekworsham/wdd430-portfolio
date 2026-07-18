import ProjectList from '../../../components/projectList';

import { fetchProjects } from '../lib/fetch-projects';

export default async function SchoolProjectsPage() {
    const projects = await fetchProjects('school');

    return <ProjectList projects={projects} />;
}


















// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   type: 'opensource' | 'school';
//   technologies: string[];
//   link?: string;
// }

// async function getProjects(): Promise<Project[]> {
//   const res = await fetch(
//     'http://localhost:3000/api/projects?type=school',
//     {
//       cache: 'no-store',
//     }
//   );

//   if (!res.ok) {
//     throw new Error('Failed to fetch projects');
//   }

//   return res.json();
// }

// export default async function SchoolProjectsPage() {
//   const projects = await getProjects();

//   return (
//     <main>
//       <h1>School Projects</h1>

//       {projects.map((project) => (
//         <article key={project.id}>
//           <h2>{project.title}</h2>
//           <p>{project.description}</p>
//         </article>
//       ))}
//     </main>
//   );
// }
