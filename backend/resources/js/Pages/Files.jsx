
import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

export default function FileUpload(props) {

    const { files = {}, isLoggedIn, userId } = props; // Extract files, isLoggedIn, and userId from props
    const { data, setData, errors, post, progress } = useForm({
        title: "",
        category: "others",
        file: null,
    });

    return (
        <Authenticated
            user={props.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Fa-ma frumos
                </h2>
            }
        >
            <Head title="File Upload" />
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

                            {/* File Upload Form */}
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) => setData("title", e.target.value)}
                                        />
                                        <span className="text-red-600">{errors.title}</span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Category</label>
                                        <select
                                            className="w-full px-4 py-2"
                                            name="category"
                                            value={data.category || ""}
                                            onChange={(e) => setData("category", e.target.value)}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="nature">Nature</option>
                                            <option value="animals">Animals</option>
                                            <option value="technology">Technology</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <span className="text-red-600">{errors.category}</span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">File</label>
                                        <input
                                            type="file"
                                            className="w-full px-4 py-2"
                                            name="file"
                                            onChange={(e) => setData("file", e.target.files[0])}
                                        />
                                        <span className="text-red-600">{errors.file}</span>
                                    </div>
                                </div>

                                {/* Show progress if available */}
                                {progress && (
                                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                        <div
                                            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                            style={{ width: `${progress.percentage}%` }}
                                        >
                                            {progress.percentage}%
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>

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