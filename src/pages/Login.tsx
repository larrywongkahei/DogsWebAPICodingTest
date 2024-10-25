import { Link } from "react-router-dom";

export default function Login():JSX.Element {
    return (
        <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="password"
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
    );
};
