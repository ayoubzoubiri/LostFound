import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#F4F4F4] px-15 py-5 ">
      <ul className="flex flex-wrap gap-4 md:gap-6">
        <li>
          <Link to="/" className=" text-[#005461] font-bold text-xl ">Lost & Found </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/my-items" className=" text-[#005461] font-bold">My Items</Link>
            </li>
            <li>
              <Link to="/declare-item" className=" text-[#005461] font-bold">Declare Item</Link>
            </li>
            {user.role === 'admin' && (
              <li>
                <Link to="/admin" className=" text-[#005461] font-bold" font-bold>Admin</Link>
              </li>
            )}
            <li className="ml-auto">
              <button onClick={logout} className="bg-[#005461] px-4 py-1 rounded text-blue-100 font-bold">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="ml-auto">
              <Link to="/login" className=" text-[#005461] font-bold">Login</Link>
            </li>
            <li>
              <Link to="/register" className="bg-[#005461] px-4 py-1 rounded text-blue-100  font-bold">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
