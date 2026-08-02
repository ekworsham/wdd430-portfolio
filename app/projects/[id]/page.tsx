// app/projects/[id]/page.tsx  (Server Component)
import { getProjectById } from '@/app/lib/projects-db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Page',
};

export default async function ProjectPage(
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
    
  const { id } = await params;

  const project = await getProjectById(Number(id));

  if (!project) {
    return <p>Project not found.</p>;
  }  

    return (
        <article>
            <h1>{project.title}</h1>

            <p>{project.description}</p>

            <p><strong>Type:</strong> {project.type}</p>

            <p><strong>Technologies:</strong>{" "} {project.technologies.join(", ")}</p>

            {project.link && (
                <p><a href={project.link} target="_blank" rel="noopener noreferrer"> View Project</a></p>
            )}
        </article>
    );
}