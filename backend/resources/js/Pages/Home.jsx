
import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

export default function FileUpload(props) {

    const { files = {}, user, } = props; // Extract files, isLoggedIn, and userId from props
    const isLoggedIn = false;
    return (
        <Authenticated
            user={user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Fa-ma frumos
                </h2>
            }
        >
            <Head title="Files" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Show login status and user ID */}
                            {isLoggedIn ? (
                                <div>
                                    <p>Welcome, User ID: {userId}</p>
                                    {/* Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="px-6 py-2 font-bold text-white bg-red-500 rounded mt-4"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <p>You are not logged in.</p>
                            )}

                            {/* Display uploaded files */}
                            <h1 className="text-xl font-semibold mt-6 mb-4">Uploaded File List:</h1>
                            {Object.entries(files).map(([category, categoryFiles]) => (
                                <div key={category} className="mb-6">
                                    <h2 className="font-bold text-lg mb-2">{category || "Uncategorized"}</h2>
                                    <table className="table-fixed w-full">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="px-4 py-2 w-20">No.</th>
                                                <th className="px-4 py-2">Title</th>
                                                <th className="px-4 py-2">Image</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoryFiles.map((file, index) => (
                                                <tr key={file.id}>
                                                    <td className="border px-4 py-2">{index + 1}</td>
                                                    <td className="border px-4 py-2">{file.title}</td>
                                                    <td className="border px-4 py-2">
                                                        <img src={file.name} alt={file.title} width="200px" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}