import { NextResponse } from 'next/server';
import { getProjectById } from '../../../projects/lib/projects-db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const projectId = parseInt(id, 10);

if (isNaN(projectId)) {
  return NextResponse.json(
    { error: "Invalid id" },
    { status: 400 }
  );
}

  // if (Number.isNaN(projectId)) {
  //   return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  // }
  const project = await getProjectById(projectId);
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}