import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";

type Project = {
    id: number;
    name: string;
    description?: string;
};

export default function Project({ projects }: { projects: Project[] }) {
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this project?")) {
            router.delete(route("project.update", id), {
                onSuccess: () => alert("Project deleted successfully!"),
                onError: () => alert("Failed to delete the project."),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link
                                href="/project/create"
                                className="btn bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                            >
                                Create Project
                            </Link>

                            {/* Added space between button and project list */}
                            <div className="mt-8">
                                {projects.length > 0 ? (
                                    projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="flex items-center justify-between p-4 mb-4 border rounded-md shadow-sm"
                                        >
                                            <div>
                                                <h3 className="font-semibold">
                                                    Project Name: {project.name}
                                                </h3>
                                                <p className="text-gray-600">
                                                    Project Description:{" "}
                                                    {project.description ||
                                                        "N/A"}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/project/${project.id}/edit`}
                                                    className="btn bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(project.id)
                                                    }
                                                    className="btn bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No projects available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
