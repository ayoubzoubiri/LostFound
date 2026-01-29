import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import ItemCard from '../components/ItemCard';
import ItemForm from '../components/ItemForm';

export default function MyItems() {
  const { myItems, loading, fetchMyItems, updateItem, deleteItem } = useItems();
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const handleUpdate = async (formData, image) => {
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) {
      data.append('image', image);
    }
    data.append('_method', 'PUT');

    await updateItem(editingItem.id, data, true);
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this item?')) {
      await deleteItem(id);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <h1>My Items</h1>
        <Link to="/declare-item">+ New Item</Link>
      </div>

      {myItems.length === 0 ? <p>No items yet</p> : (
        <div>
           {myItems.map(item => (
             <div key={item.id}>
               {editingItem?.id === item.id ? (
                 <ItemForm
                   initialData={item}
                   onSubmit={handleUpdate}
                   onCancel={() => setEditingItem(null)}
                   submitLabel="Save"
                 />
               ) : (
                 <ItemCard
                   item={item}
                   actions={
                     <>
                       <button onClick={() => setEditingItem(item)}>Edit</button>
                       <button onClick={() => handleDelete(item.id)}>Delete</button>
                     </>
                   }
                 />
               )}
             </div>
           ))}
        </div>
      )}
    </div>
  );
}
