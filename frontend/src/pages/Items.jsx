import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';
import Hero from '../components/Hero';

export default function Items() {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const { items, loading, fetchItems } = useItems();
  const { user } = useAuth();

  useEffect(() => {
    fetchItems({ type, location });
  }, [type, location]);

  return (
    <div>
      <Hero />
      
      <div className="max-w-6xl mx-auto p-4 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#005461]">Browse All Items</h2>
          {user && (
            <Link to="/declare-item" className="bg-[#005461] text-white px-4 py-2 rounded ">
              + Declare Item
            </Link>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded" >
            <option value="">All Types</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <input type="text" placeholder="Search location..." value={location} onChange={(e) => setLocation(e.target.value)}className="border p-2 rounded flex-1"/>
        </div>

        {loading ? (
          <p className="text-center text-gray-100 p-8">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-100 p-8">No items found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
