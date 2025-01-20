import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

interface Employee {
    id: number;
    name: string;
    position: string;
}

interface Project {
    id: number;
    name: string;
}

export default function EmployeeDetail({
    employee,
    unassignedProjects,
}: {
    employee: Employee;
    unassignedProjects: Project[];
}) {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    console.log(unassignedProjects);

    const handleAssign = () => {
        if (!selectedProject) {
            alert("Please select a project to assign.");
            return;
        }

        router.post(
            `/employee/${employee.id}/assign`,
            { project_id: selectedProject },
            {
                onSuccess: () => alert("Project assigned successfully!"),
                onError: () => alert("Failed to assign the project."),
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Employee Details
                </h2>
            }
        >
            <Head title={`${employee.name}'s Details`} />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                {employee.name}
                            </h3>
                            <p className="text-lg text-gray-700">
                                <strong>ID:</strong> {employee.id}
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong>Position:</strong> {employee.position}
                            </p>

                            {/* Assign Project Section */}
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-700">
                                    Assign to a Project
                                </h4>
                                <select
                                    className="mt-2 block w-full border-gray-300 rounded"
                                    onChange={(e) =>
                                        setSelectedProject(
                                            Number(e.target.value)
                                        )
                                    }
                                    value={selectedProject || ""}
                                >
                                    <option value="" disabled>
                                        Select a project
                                    </option>
                                    {unassignedProjects.map((project) => (
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    onClick={handleAssign}
                                    className="mt-4 btn bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                                >
                                    Assign
                                </button>
                            </div>

                            {/* Back Button */}
                            <div className="mt-6">
                                <button
                                    onClick={() => router.visit("/employee")}
                                    className="btn bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
                                >
                                    Back to Employee List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
