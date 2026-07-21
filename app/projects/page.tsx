import {
  fetchFilteredProjects,
  fetchProjectsPages,
  type Project,
} from "../lib/projects-db";

import ProjectSearch from "../../components/projectSearch";
import Pagination from "../../components/pagination";
import { deleteProject } from "@/app/lib/actions";

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

        <form action={deleteProject.bind(null, project.id)}>
          <button type="submit">Delete</button>
        </form>
      </article>
      ))}

      <Pagination totalPages={totalPages} />
    </main>
  );
}