// app/projects/create/page.tsx
import { createProject } from '@/app/lib/actions';

export default function Page() {
  return (
    <form action={createProject}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" required />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" required />

      <label htmlFor="technologies">Technologies (comma-separated)</label>
      <input id="technologies" name="technologies" required />

      <button type="submit">Save Project</button>
    </form>
  );
}