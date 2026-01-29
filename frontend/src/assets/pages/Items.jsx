import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';

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
      <div>
        <h1>Lost & Found Items</h1>
        {/* CTA is redundant with Navbar but good for UX */}
        {user && (
          <Link to="/declare-item">
            + Declare Item
          </Link>
        )}
      </div>

      <div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <input
          type="text"
          placeholder="Search location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <div>
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
