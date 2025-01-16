import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Employee {
    id: number;
    name: string;
    position: string;
}

export default function EmployeeDetail({ employee }: { employee: Employee }) {
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
