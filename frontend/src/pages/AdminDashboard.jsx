import { useState, useEffect } from 'react';
import api from '../api/api';
import AdminItemRow from '../components/AdminItemRow';
import StatCard from '../components/StatCard';

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const res = await api.get('/items');
    setItems(res.data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/admin/items/${id}/status`, { status });
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this item?')) {
      await api.delete(`/admin/items/${id}`);
      fetchItems();
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }



  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>

  
      <div className="bg-white border rounded overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => ( 
              <AdminItemRow key={item.id} item={item} onUpdateStatus={updateStatus} onDelete={handleDelete} /> 
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
