import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Employee {
    id: number;
    name: string;
    position: string;
    deleted_at: string;
}

export default function EmployeeRecord({
    employees,
}: {
    employees: Employee[];
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Deleted Employees
                </h2>
            }
        >
            <Head title="Employee Record" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Below are the soft-deleted employees:</p>
                            {employees.length > 0 ? (
                                <ul className="divide-y divide-gray-200 mt-4">
                                    {employees.map((employee) => (
                                        <li key={employee.id} className="py-4">
                                            <p>
                                                <strong>Name:</strong>{" "}
                                                {employee.name}
                                            </p>
                                            <p>
                                                <strong>Position:</strong>{" "}
                                                {employee.position}
                                            </p>
                                            <p>
                                                <strong>Deleted At:</strong>{" "}
                                                {employee.deleted_at}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">
                                    No deleted employees found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
