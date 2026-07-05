import MissionStatement from "@/components/MissionStatement"; 

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-gray-700">
        This about page shares more information about my background and work.
      </p>

      <MissionStatement
        heading="My Mission"
        mission="To make it happen!"
      />
    </main>
  );
}