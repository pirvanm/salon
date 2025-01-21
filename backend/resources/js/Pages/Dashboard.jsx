import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';
import { Head } from '@inertiajs/react';
import axios from 'axios';



export default function Dashboard(props) {
    // State for file upload form
    const [data, setData] = useState({
        title: "",
        file: null,
    });

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    const token = document.head.querySelector('meta[name="csrf-token"]');
    if (token) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    } else {
        console.error('CSRF token not found');
    }

    // State for list of files
    const [files, setFiles] = useState([]);

    // Handle file upload form submission
    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('file', data.file);

        axios.post('/api/file/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                alert('File uploaded successfully!');
                setData({ title: "", file: null });
                fetchFiles(); // Refresh the file list
            })
            .catch((error) => {
                console.error(error.response.data);
                alert('File upload failed!');
            });
    }

    // Fetch the list of uploaded files
    function fetchFiles() {
        axios.get('/api/files')
            .then((response) => {
                setFiles(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }

    // Fetch files when the component mounts
    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Laravel React JS File Upload Example
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
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
                                                setData({ ...data, title: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* File Input */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700">File</label>
                                        <input
                                            type="file"
                                            className="w-full px-4 py-2 border rounded"
                                            name="file"
                                            onChange={(e) =>
                                                setData({ ...data, file: e.target.files[0] })
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </form>

                            <br />
                            <h1 className="text-xl font-semibold mb-4">Uploaded File List:</h1>
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border">No.</th>
                                        <th className="px-4 py-2 border">Title</th>
                                        <th className="px-4 py-2 border">File</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.length > 0 ? (
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