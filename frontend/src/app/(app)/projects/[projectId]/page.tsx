import ProjectDetails from "@/features/projects/components/ProjectDetails";

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;

    return <ProjectDetails id={projectId} />;
}