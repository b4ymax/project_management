import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Project {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    name: string;
    position: string;
    projects: Project[];
}

export default function EmployeeProjects({
    employees: initialEmployees,
}: {
    employees: Employee[];
}) {
    // State to hold the filtered employees based on search input
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEmployees, setFilteredEmployees] =
        useState<Employee[]>(initialEmployees);

    // Handle search input change and filter employees accordingly (SEACH FROM LOCAL)
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filter employees based on name, position, and project names matching the search term
        const filtered = initialEmployees.filter((employee) => {
            const nameMatches = employee.name
                .toLowerCase()
                .includes(value.toLowerCase());
            const positionMatches = employee.position
                .toLowerCase()
                .includes(value.toLowerCase());
            const projectMatches = employee.projects.some((project) =>
                project.name.toLowerCase().includes(value.toLowerCase())
            );

            return nameMatches || positionMatches || projectMatches;
        });

        setFilteredEmployees(filtered);
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Employee Projects
                    </h2>
                </>
            }
        >
            <Head title="Employee Projects" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>You are in the Employee Projects page.</p>

                            {/* Search input for filtering employees */}
                            <div className="mt-6 mb-6">
                                <input
                                    type="text"
                                    placeholder="Search by name, position, or project"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Back Button */}
                            <div className="mb-6">
                                <Link
                                    href="/employee"
                                    className="btn bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
                                >
                                    Cancel
                                </Link>
                            </div>

                            <div className="mt-6">
                                {filteredEmployees.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {filteredEmployees.map((employee) => (
                                            <li
                                                key={employee.id}
                                                className="py-4 flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="font-semibold">
                                                        {employee.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {employee.position}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <strong>
                                                            Assigned Projects:
                                                        </strong>
                                                        {employee.projects
                                                            .length > 0 ? (
                                                            <ul>
                                                                {employee.projects.map(
                                                                    (
                                                                        project
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                project.id
                                                                            }
                                                                        >
                                                                            {
                                                                                project.name
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        ) : (
                                                            <span>
                                                                No projects
                                                                assigned
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">
                                        No matching employees found.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
