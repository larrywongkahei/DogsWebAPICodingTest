import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_Request from "../API_Request";
import { toast, ToastContainer } from "react-toastify";

export default function Login(): JSX.Element {

    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigator = useNavigate();

    async function handleLogin(e:React.FormEvent) {
        e.preventDefault();
        const { success, description } = await API_Request.POST(`${import.meta.env.VITE_BACKEND_ENDPOINT}/account/login`,
            {
                username: "testing123",
                password: "testingpassword"
            },
        )
        if (!success) {
            toast.error(description)
            toast.error("Register if you do not have an account.")
        }else{
            toast.success("Successfully logged in, redirecting to home page...", {
                onClose: () => navigator("/", {replace: true})
            })
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer autoClose={2000} />
            <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};
