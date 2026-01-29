import React, { useEffect, useState } from 'react';
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
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (image) {  data.append('image', image); }
      data.append('_method', 'PUT');

      await updateItem(editingItem.id, data, true);
       setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error); 
       alert('Failed to update item. Please try again.');  }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this item?')) {  
      await deleteItem(id); }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">My Items</h1>
        <Link to="/declare-item" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ New Item</Link>
      </div>

      {myItems.length === 0 ? <p className="text-center text-gray-500 p-8">No items yet</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
           {myItems.map(item => (
             editingItem?.id === item.id ? (
               <div key={item.id} className="bg-white border rounded p-4">
                 <ItemForm initialData={item} onSubmit={handleUpdate} onCancel={() => setEditingItem(null)} submitLabel="Save" />
               </div>
             ) : (
               <ItemCard key={item.id} item={item} actions={
                   <>
                     <button onClick={() => setEditingItem(item)} className="bg-[#00B7B5] text-white px-3 py-1 rounded text-sm hover:bg-[#018790]">Edit</button>
                     <button onClick={() => handleDelete(item.id)} className="bg-[#00B7B5] text-white px-3 py-1 rounded text-sm hover:bg-[#018790] ">Delete</button>
                   </>
                 }
               />
             )
           ))}
        </div>
      )}
    </div>
  );
}
