// app/projects/[id]/edit/page.tsx
import { updateProject } from '@/app/lib/actions';
import { getProjectById } from '@/app/lib/projects-db';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    notFound();
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <main>
      <h1>Edit Project</h1>

      <form action={updateProjectWithId} className="space-y-4">

        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>

          <input
            id="title"
            name="title"
            defaultValue={project.title}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            defaultValue={project.description}
            className="w-full border rounded p-2"
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="technologies" className="block font-medium">
            Technologies (comma-separated)
          </label>

          <input
            id="technologies"
            name="technologies"
            defaultValue={project.technologies.join(", ")}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Project
        </button>

      </form>
    </main>
  );
}