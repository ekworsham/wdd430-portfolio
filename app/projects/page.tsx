// app/projects/page.tsx
import Link from "next/link";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
  type Project,
} from "../lib/projects-db";
import { deleteProject } from "@/app/lib/actions";
import ProjectSearch from "../../components/projectSearch";
import Pagination from "../../components/pagination";
import { redirect } from "next/navigation";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Page',
};

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  // Read the session
  const session = await auth();
  const user = session?.user;

  // Read search params
  const searchParams = await props.searchParams;

  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch data
  const projects = await fetchFilteredProjects(query, currentPage);
  const totalPages = await fetchProjectsPages(query);


  if (!session) {
    redirect("/login");
  }

  return (
    <main className="max-w-5xl mx-auto p-6">

      {/* Welcome message */}
      {user && (
        <p className="mb-4 text-gray-600">
          Welcome, <strong>{user.name}</strong>!
        </p>
      )}

     <div className="mb-6 flex justify-end gap-4">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Sign Out
          </button>
        </form>

        <Link
          href="/projects/create"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Create Project
        </Link>
      </div>

      <ProjectSearch />

      <div className="mt-6 grid gap-6">
        {projects.map((project: Project) => (
          <article
            key={project.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"
          >
            <h2 className="mb-2 text-2xl font-semibold">
              {project.title}
            </h2>

            <p className="mb-6 text-gray-700">
              {project.description}
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Technologies
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies
                  .map((tech) => tech.trim())
                  .filter(Boolean)
                  .map((tech) => (
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