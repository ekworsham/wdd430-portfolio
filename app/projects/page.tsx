import {
  fetchFilteredProjects,
  fetchProjectsPages,
  type Project,
} from "./lib/projects-db";

import ProjectSearch from "../../components/projectSearch";
import Pagination from "../../components/pagination";

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const projects = await fetchFilteredProjects(query, currentPage);
  const totalPages = await fetchProjectsPages(query);

  return (
    <main>
      <h1>Projects</h1>

      <ProjectSearch />

      {projects.map((project: Project) => (
        <article key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </article>
      ))}

      <Pagination totalPages={totalPages} />
    </main>
  );
}