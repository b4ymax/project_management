import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

interface Employee {
    id: number;
    name: string;
    position: string;
}

export default function Employee({
    employees: initialEmployees,
}: {
    employees: Employee[];
}) {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this employee?")) {
            Inertia.delete(`/employee/${id}`, {
                onSuccess: () => {
                    setEmployees((prevEmployees) =>
                        prevEmployees.filter((employee) => employee.id !== id)
                    );
                    alert("Employee soft-deleted successfully!");
                },
                onError: () => alert("Failed to delete the employee."),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Employees
                    </h2>
                </>
            }
        >
            <Head title="Employees" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>You are on the Employee page.</p>

                            <div className="mt-6 flex space-x-4">
                                <button
                                    onClick={() =>
                                        router.visit("/employee/create")
                                    }
                                    className="btn bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                                >
                                    Create Employee
                                </button>
                                <button
                                    onClick={() =>
                                        router.visit(
                                            route("employee.assignProject")
                                        )
                                    }
                                    className="btn bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                                >
                                    Assign Project
                                </button>
                                <button
                                    onClick={() =>
                                        router.visit(
                                            "/employee/employeeprojects"
                                        )
                                    }
                                    className="btn bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                                >
                                    Employee Projects
                                </button>
                                <button
                                    onClick={() =>
                                        router.visit("/employee/employeerecord")
                                    }
                                    className="btn bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
                                >
                                    Employee Record
                                </button>
                            </div>

                            <div className="mt-6">
                                {employees.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {employees.map((employee) => (
                                            <li
                                                key={employee.id}
                                                className="py-4 flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="font-semibold">
                                                        <a
                                                            href={`/employee/${employee.id}`}
                                                            className="font-semibold text-blue-600 hover:underline"
                                                        >
                                                            {employee.name}
                                                        </a>
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {employee.position}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            Inertia.visit(
                                                                `/employee/${employee.id}/edit`
                                                            )
                                                        }
                                                        className="btn bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                employee.id
                                                            )
                                                        }
                                                        className="btn bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">
                                        No employees found.
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
