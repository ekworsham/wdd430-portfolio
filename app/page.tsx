import ProjectList from '@/components/projectList';

const projects = [
  {
    title: 'Whitewater Rafting',
    description: 'A webpage to review rivers and book rafting trips.',
    technologies: ['html', 'TypeScript', 'CSS'],
    link: 'https://ekworsham.github.io/wdd130/'
  },
  {
    title: 'Whoville Chamber of Commerce',
    description: 'A app that fetches and displays members of the Chamber of Commerce',
    technologies: ['html', 'json', 'CSS'],
    link:  'https://ekworsham.github.io/wdd231/'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-center">
          <h1 className="max-w-xs text-5xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            My Portfolio</h1>
          <p className="max-auto text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I am a full-stack developer learning Next.js and React. Here are some of my recent projects.{" "}
          </p>
          <ProjectList projects={projects} />
        </div>
      </main>
    </div>
  );
}
