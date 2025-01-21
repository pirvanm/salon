import React from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function FileUpload(props) {
    // Accessing files from props using Inertia's `usePage`
    const { files } = usePage().props;

    // Managing form data and errors using Inertia's `useForm`
    const { data, setData, errors, post, progress } = useForm({
        title: "",
        file: null,
    });

    // Handle form submission for file upload
    function handleSubmit(e) {
        e.preventDefault();
        post(route("file.upload.store"), {
            onSuccess: () => {
                // Reset form fields after a successful upload
                setData("title", "");
                setData("file", null);
            },
        });
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Laravel React JS File Upload Example - ItSolutionStuff.com
                </h2>
            }
        >
            <Head title="File Upload" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* File Upload Form */}
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    {/* Title Input */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border rounded"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.title}
                                        </span>
                                    </div>

                                    {/* File Input */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700">File</label>
                                        <input
                                            type="file"
                                            className="w-full px-4 py-2 border rounded"
                                            name="file"
                                            onChange={(e) =>
                                                setData("file", e.target.files[0])
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.file}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                {progress && (
                                    <div className="w-full bg-gray-200 rounded-full mt-4">
                                        <div
                                            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                            style={{ width: `${progress.percentage}%` }}
                                        >
                                            {progress.percentage}%
                                        </div>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>

                            <br />
                            <h1 className="text-xl font-semibold mb-4">Uploaded File List:</h1>

                            {/* File List Table */}
                            <table className="table-fixed w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20 border">No.</th>
                                        <th className="px-4 py-2 border">Title</th>
                                        <th className="px-4 py-2 border">Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files && files.length > 0 ? (
                                        files.map(({ id, title, name }, index) => (
                                            <tr key={id}>
                                                <td className="border px-4 py-2 text-center">
                                                    {index + 1}
                                                </td>
                                                <td className="border px-4 py-2">{title}</td>
                                                <td className="border px-4 py-2">
                                                    <img
                                                        src={name}
                                                        alt={title}
                                                        className="w-32 h-auto object-cover"
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t text-center"
                                                colSpan="3"
                                            >
                                                No files found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}