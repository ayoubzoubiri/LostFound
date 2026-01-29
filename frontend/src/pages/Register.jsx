import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(name, email, password, confirmPassword);
      navigate('/');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-8">
      <div className="bg-white border rounded p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#005461]">Register</h1>

        {error && <p className="text-red-600 bg-red-50 p-3 rounded mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-3 rounded" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 rounded" required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border p-3 rounded" required />
          <button className="bg-[#005461] text-white p-3 rounded  font-medium"> Register </button>
        </form>

        <p className="mt-4 text-center text-[#005461] text-sm">
          Have account? <Link to="/login" className="text-[#005461] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
