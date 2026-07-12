import { getProjects } from '../../projects/lib/projects-db';

const validTypes = new Set(['opensource', 'school']);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type && !validTypes.has(type)) {
        return Response.json({ error: 'Invalid project type' }, { status: 400 });
    }

    return Response.json(getProjects(type));
}