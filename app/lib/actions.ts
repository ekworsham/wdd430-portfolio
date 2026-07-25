 // app/lib/actions.ts
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const currentYear = new Date().getFullYear();

const ProjectFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  technologies: z.string().min(2),
  yearCompleted: z.coerce
    .number()
    .int('Year must be a whole number.')
    .gte(2000, 'Year must be 2000 or later.')
    .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    technologies?: string[];
    yearCompleted?: string[];
  };
  message?: string | null;
};

export async function createProject(
  _prevState: State,
  formData: FormData
): Promise<State> {
 
  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
    yearCompleted: formData.get('yearCompleted'),
  };

  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Invalid project input.',
    };
  }

const { title, description, technologies, yearCompleted } = parsed.data;

try {
  await sql`
    INSERT INTO projects (title, description, technologies, year_completed)
    VALUES (${title}, ${description}, ${technologies}, ${yearCompleted})
  `;

} catch {
  return {
    errors: {},
    message: "Database Error: Failed to create project.",
  };
}

revalidatePath("/projects");
redirect("/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
    yearCompleted: formData.get('yearCompleted'),
  };

 const parsed = ProjectFormSchema.safeParse(raw);

if (!parsed.success) {
  return {
    errors: parsed.error.flatten().fieldErrors,
    message: "Invalid project input.",
  };
}

  const { title, description, technologies, yearCompleted } = parsed.data;

await sql`
  UPDATE projects
  SET
    title = ${title}, 
    description = ${description}, 
    technologies = ${technologies}, 
    year_completed = ${yearCompleted}
  WHERE id = ${id}
`;

  revalidatePath('/projects');
  redirect('/projects');
}

export async function deleteProject(id: number) {
  await sql`
    DELETE FROM projects
    WHERE id = ${id}
  `;

  revalidatePath('/projects');
  redirect('/projects');
}