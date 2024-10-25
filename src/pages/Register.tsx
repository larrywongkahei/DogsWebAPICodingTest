import { Link } from 'react-router-dom';

export default function Register(): JSX.Element{
    return (
    <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
        />
        <button className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
          Register
        </button>
      </form>
      <p className="text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/" className="text-green-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};