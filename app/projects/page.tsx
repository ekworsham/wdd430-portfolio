import { getProjects, type Project } from "./lib/projects-db";

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;
  console.log({ query, currentPage });

  const projects = await getProjects();

  return (
    <main>
      <h1>Projects</h1>

      {projects.map((project: Project) => (
        <article key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </article>
      ))}
    </main>
  );
}