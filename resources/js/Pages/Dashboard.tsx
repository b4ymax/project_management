import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

interface Auth {
    user: {
        role: string;
    };
}

export default function Dashboard({ auth }: { auth: Auth }) {
    return (
        <AuthenticatedLayout
            header={
                <>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                </>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>You are logged in.</p>

                            <div className="mt-6 flex space-x-4">
                                {/* Projects button is always visible */}
                                <button
                                    onClick={() =>
                                        (window.location.href = "/project")
                                    }
                                    className="btn bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                                >
                                    Projects
                                </button>

                                {/* Employee button only visible for non-admin roles */}
                                {auth.user.role !== "admin" && (
                                    <button
                                        onClick={() =>
                                            (window.location.href = "/employee")
                                        }
                                        className="btn bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                                    >
                                        Employees
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
