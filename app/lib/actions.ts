// app/lib/actions.ts
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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
      INSERT INTO projects (
        title,
        description,
        technologies,
        year_completed
      )
      VALUES (
        ${title},
        ${description},
        ${technologies},
        ${yearCompleted}
      )
    `;
  } catch {
    return {
      errors: {},
      message: 'Database Error: Failed to create project.',
    };
  }

  revalidatePath('/projects');
  redirect('/projects');
}

export async function updateProject(
  id: string,
  formData: FormData
): Promise<void> {
  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
    yearCompleted: formData.get('yearCompleted'),
  };

  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error('Invalid project input.');
  }

  const { title, description, technologies, yearCompleted } = parsed.data;

  try {
    await sql`
      UPDATE projects
      SET
        title = ${title},
        description = ${description},
        technologies = ${technologies},
        year_completed = ${yearCompleted}
      WHERE id = ${id}
    `;
  } catch {
    throw new Error('Database Error: Failed to update project.');
  }

  revalidatePath('/projects');
  redirect('/projects');
}

export async function deleteProject(id: number): Promise<void> {
  try {
    await sql`
      DELETE FROM projects
      WHERE id = ${id}
    `;
  } catch {
    throw new Error('Database Error: Failed to delete project.');
  }

  revalidatePath('/projects');
  redirect('/projects');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error; // re-throw so Next.js handles redirects correctly
  }
}