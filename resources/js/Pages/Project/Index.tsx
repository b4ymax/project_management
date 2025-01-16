import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Project } from "@/types"; // Importing the Project type from Types.ts

type Props = {
    projects: Project[]; // Use the Project type for the projects array
};

export default function Index({ projects }: Props) {
    return (
        <div>
            <Head title="Projects" />
            <h1 className="text-2xl font-semibold">Projects</h1>

            <div className="mt-6">
                <Link
                    href="/projects/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add New Project
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white p-4 rounded shadow"
                    >
                        <h3 className="text-xl font-bold">{project.name}</h3>
                        <p>{project.description}</p>

                        <div className="mt-4 flex space-x-2">
                            <Link
                                href={`/projects/${project.id}/edit`}
                                className="text-blue-500"
                            >
                                Edit
                            </Link>
                            <Link
                                href={`/projects/${project.id}/delete`}
                                method="delete"
                                as="button"
                                className="text-red-500"
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
