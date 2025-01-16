import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EmployeeIndex({ employees }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Employees
                </h2>
            }
        >
            <Head title="Employees" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link
                                href="/employee/createemployee"
                                className="btn bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                            >
                                Create Employee
                            </Link>

                            <div className="mt-8">
                                {employees.length > 0 ? (
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    ID
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Name
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Position
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.map((employee) => (
                                                <tr key={employee.id}>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {employee.id}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {employee.name}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {employee.position}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <Link
                                                            href={`/employee/${employee.id}/edit`}
                                                            className="btn bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <form
                                                            action={`/employee/${employee.id}`}
                                                            method="POST"
                                                            className="inline"
                                                        >
                                                            <input
                                                                type="hidden"
                                                                name="_method"
                                                                value="DELETE"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="_token"
                                                                value={document
                                                                    .querySelector(
                                                                        'meta[name="csrf-token"]'
                                                                    )
                                                                    ?.getAttribute(
                                                                        "content"
                                                                    )}
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="btn bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 ml-2"
                                                            >
                                                                Delete
                                                            </button>
                                                        </form>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No employees available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
