import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => { e.preventDefault();
    setError('');

    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-8">
      <div className="bg-white border rounded p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#005461]">Login</h1>

        {error && <p className="text-red-600 bg-red-50 p-3 rounded mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded"required/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 rounded" required />
          <button className="bg-[#005461] text-white p-3 rounded  font-medium"> Login </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm"> No account?  
          <Link to="/register" className="text-[#005461] hover:underline">Register</Link>
        </p>

      </div>
    </div>
  );
}
