import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

interface Employee {
    id: number;
    name: string;
}

interface Project {
    id: number;
    name: string;
}

export default function AssignProject({
    employees,
    projects,
}: {
    employees: Employee[];
    projects: Project[];
}) {
    const [selectedEmployee, setSelectedEmployee] = useState<number | "">("");
    const [selectedProject, setSelectedProject] = useState<number | "">("");

    const handleAssign = () => {
        if (!selectedEmployee || !selectedProject) {
            alert("Please select both an employee and a project.");
            return;
        }

        Inertia.post(
            "/employee/assign",
            {
                employee_id: selectedEmployee,
                project_id: selectedProject,
            },
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
                    Assign Project
                </h2>
            }
        >
            <Head title="Assign Project" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Select an employee and a project to assign:</p>

                            <div className="mt-6 space-y-4">
                                {/* Employee Selection */}
                                <div>
                                    <label
                                        htmlFor="employee"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Employee
                                    </label>
                                    <select
                                        id="employee"
                                        value={selectedEmployee}
                                        onChange={(e) =>
                                            setSelectedEmployee(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    >
                                        <option value="">
                                            Select an employee
                                        </option>
                                        {employees.map((employee) => (
                                            <option
                                                key={employee.id}
                                                value={employee.id}
                                            >
                                                {employee.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Project Selection */}
                                <div>
                                    <label
                                        htmlFor="project"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Project
                                    </label>
                                    <select
                                        id="project"
                                        value={selectedProject}
                                        onChange={(e) =>
                                            setSelectedProject(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    >
                                        <option value="">
                                            Select a project
                                        </option>
                                        {projects.map((project) => (
                                            <option
                                                key={project.id}
                                                value={project.id}
                                            >
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Assign Button */}
                                <div>
                                    <button
                                        onClick={handleAssign}
                                        className="btn bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                                    >
                                        Assign Project
                                    </button>
                                </div>
                            </div>

                            {/* Back Button */}
                            <div className="mt-6">
                                <Link
                                    href="/employee"
                                    className="btn bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
