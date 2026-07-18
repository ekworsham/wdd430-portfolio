import { fetchProjects } from "../lib/fetch-projects";
import ProjectList from "../../../components/projectList";

export default async function SchoolProjectList() {
  // Temporary delay to demonstrate loading.tsx
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const projects = await fetchProjects("school");

  return <ProjectList projects={projects} />;
}