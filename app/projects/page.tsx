interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    "http://localhost:3000/api/projects",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export default async function OpenSourceProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <h1>Open Source Projects</h1>

      {projects.map((project) => (
        <article key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </article>
      ))}
    </main>
  );
}