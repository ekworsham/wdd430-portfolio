interface MissionStatementProps {
    heading: string;
    mission: string;
}

export default function MissionStatement({
    heading,
    mission,
}: MissionStatementProps) {
    return (
        <section className="mx-auto my-8 ,ax-w-3x1 rounded-x1 border border-bg-green-50 p-6 shadow-md">
            <h2 className="mb-4 text-4xl font-bold text-blue-800">
                {heading}
            </h2>

            <p className="text-xl leading-8 font-bold text-green-700">
                {mission}
            </p>
        </section>   
    );
}