import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTimes, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../redux/store'; // Use useAppSelector to access state
import { fetchAllWorkspaces } from '../../redux/slices/workspaceSlice';
import toast, { Toaster } from 'react-hot-toast';
import { deactivateWorkspace } from "../../redux/slices/workspaceSlice";

const Dashboard: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { workspaces, loading, error } = useAppSelector((state) => state.workspace); // Access state from Redux

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                await dispatch(fetchAllWorkspaces()).unwrap(); // Unwrap to handle result
            } catch (err) {
                console.error('Failed to fetch workspaces:', err);
            }
        };

        fetchWorkspaces();
    }, [dispatch]);

    const handleDeactivate = async (id: string) => {
        try {
            // Dispatch the action with the workspace ID
            await dispatch(deactivateWorkspace(id)).unwrap();
            toast.success('Workspace deactivated successfully!');
            await dispatch(fetchAllWorkspaces()).unwrap();
        } catch (error) {
            toast.error('Failed to deactivate workspace.');
        }
    };
    console.log("workspaces data:", workspaces);

    const imageUrl = (url: any) => {
        const baseUrl = 'http://localhost:5000';
        console.log("url::", url);

        const imageUrl = url ? `${baseUrl}/${url}` : 'https://picsum.photos/200/300';
        return imageUrl
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 font-bold text-xl">Dashboard</div>
                <nav className="flex-1">
                    <ul>
                        <li className="p-4 hover:bg-gray-700"><a href="/admin/dashboard" className="text-blue-600 hover:underline">Home</a></li>
                        <li className="p-4 hover:bg-gray-700"><a href="/admin/profile/" className="text-blue-600 hover:underline">Profile</a></li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Workspace List</h1>
                    <button onClick={() => { navigate("/workspace") }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Add New Workspace
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workspaces && workspaces.map((workspace) => (
                        <div key={workspace._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={imageUrl(workspace.logo)}
                                alt={workspace.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-bold mb-2">{workspace.name}</h2>
                            <p className="text-gray-600">{workspace.email}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <a href={`/workspace/view/${workspace._id}`} className="text-blue-600 hover:underline flex items-center">
                                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                                    View Details
                                </a>
                                <button
                                    onClick={() => navigate(`/workspace/Edit/${workspace._id}`)}
                                    style={{ height: '40px' }}
                                    className="text-white bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 transition flex items-center"
                                >
                                    <FontAwesomeIcon icon={faEdit} className="mr-1" />
                                </button>
                                <button
                                    style={{ height: '40px' }}
                                    onClick={() => handleDeactivate(workspace._id)}
                                    className="text-white bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 transition flex items-center"
                                >
                                    <FontAwesomeIcon icon={faTimes} className="mr-1" />
                                    Deactivate
                                </button>
                                <button
                                    style={{ height: '40px' }}
                                    onClick={() => navigate(`/workSpace/dashboard`)}
                                    className="text-white bg-purple-600 px-3 py-1 rounded-lg hover:bg-purple-700 transition flex items-center"
                                >
                                    <FontAwesomeIcon icon={faUnlockAlt} className="mr-1" />

                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Dashboard;
