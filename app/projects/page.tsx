import Link from "next/link";
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
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Projects</h1>

      <ProjectSearch />

      <div className="grid gap-6 mt-6">
        {projects.map((project: Project) => (
          <article
            key={project.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {project.title}
            </h2>

            <p className="text-gray-700 mb-6">
              {project.description}
            </p>
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Technologies:
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>




            <div className="flex gap-3">
              <Link
                href={`/projects/${project.id}/edit`}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Edit
              </Link>

              <form action={deleteProject.bind(null, project.id)}>
                <button
                  type="submit"
                  className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}