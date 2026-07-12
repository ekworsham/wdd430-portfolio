import { getProjectById } from '../../../projects/lib/projects-db';

function parseProjectId(id: string): number | null {
  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    return null;
  }

  return projectId;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const projectId = parseProjectId(id);

  if (projectId === null) {
    return Response.json(
      { error: 'Invalid project id' },
      { status: 400 }
    );
  }

  const project = getProjectById(projectId);

  if (!project) {
    return Response.json(
      { error: 'Project not found' },
      { status: 404 }
    );
  }

  return Response.json(project);
}