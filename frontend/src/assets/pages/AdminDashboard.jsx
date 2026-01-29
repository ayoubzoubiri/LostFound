import { useState, useEffect } from 'react';
import api from '../api/api';
import AdminItemRow from '../components/AdminItemRow';
import StatCard from '../components/StatCard';

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const res = await api.get('/admin/items');
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

  const total = items.length;
  const lost = items.filter((i) => i.type === 'lost').length;
  const found = items.filter((i) => i.type === 'found').length;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        <StatCard label="Total" value={total} />
        <StatCard label="Lost" value={lost} />
        <StatCard label="Found" value={found} />
      </div>

      <div>
        <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Item</th>
              <th>Type</th>
              <th>User</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <AdminItemRow
                key={item.id}
                item={item}
                onUpdateStatus={updateStatus}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
