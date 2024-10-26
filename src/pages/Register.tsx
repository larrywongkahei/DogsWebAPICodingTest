import { useState } from 'react';
import { Link } from 'react-router-dom';
import API_Request from '../API_Request';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register(): JSX.Element {

  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigator = useNavigate()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const { success, description } = await API_Request.POST<{username:string, password:string}>(`${import.meta.env.VITE_BACKEND_ENDPOINT}/account/register`,
      {
        username: "testing1234",
        password: "testingpassword"
      },
    )
    if (!success) {
      toast.error(description);
    } else {
      toast.success("Successfully registered, Directing to login page...", {
        onClose: () => navigator("/Login", {replace: true})
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          <button type="submit" className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
            Register
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/Login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};