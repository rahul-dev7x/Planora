import { Outlet, Link } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { EVENT_ORG_LOGOUT_URL} from '@/config';
import { useDispatch } from 'react-redux';

import { setUser } from '@/redux/auth-slice';


import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { api } from '@/config/api';
import { toast, ToastContainer } from 'react-toastify';

const DashboardLayout = () => {
    const dispatch = useDispatch();
    const user = useSelector(state=> state.auth.user);

    const handleLogout = async () => {
        const response = await api.post(`${EVENT_ORG_LOGOUT_URL
        }`);
        console.log(response)
        if (response.data.success) {
            toast(response.data.message);
            dispatch(setUser(null));
        }
    };

    return (
        <div className="flex h-screen overflow-hidden ">
            
            <aside className="w-64 bg-gradient-to-b from-gray-700 to-gray-800 text-white flex flex-col justify-between">
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-8 text-gray-200 text-center">Planora</h1>
                    {/* Divider Line */}
                    <div className="border-t border-gray-400 my-6 w-full"></div>

                    <ul className="space-y-6">
                        <li>
                            <Link
                                to="/dashboard/events"
                                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors"
                            >
                                <FaTachometerAlt size={20} />
                                <span className="text-lg">Events</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* User Info */}
                {user && (
                    <div className="p-6 flex items-center gap-4">
                        <Avatar className="w-12 h-12 text-gray-600 text-2xl">
                            <AvatarFallback>{user.name.split(' ')[0]?.[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-lg capitalize">{user.name.split(' ')[0]}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-gray-100">
                {/* Navbar */}
                <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
                    <h2 className="text-2xl text-gray-800 font-semibold">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-lg text-gray-700">
                            Welcome {user?.name.split(' ')[0]}
                        </span>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                            onClick={user ? handleLogout : undefined}
                        >
                            {user ? (
                                <span>Logout</span>
                            ) : (
                                <Link to="/login" className="text-white">
                                    Login
                                </Link>
                            )}
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <main className=" flex-1 p-4 overflow-y-auto">
                    <Outlet />
                    <ToastContainer/>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
