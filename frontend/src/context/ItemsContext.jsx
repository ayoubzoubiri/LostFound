import { createContext, useContext, useState } from 'react';
import api from '../api/api';

const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async (filters = {}) => {
    try {
      setLoading(true);
      const res = await api.get('/items', { params: filters });
      setItems(res.data.data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyItems = async () => {
    try {
      setLoading(true);
      const res = await api.get('/my-items');
      setMyItems(res.data || []);
    } catch (error) {
      console.error('Error fetching my items:', error);
      setMyItems([]);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (formData) => {
    await api.post('/items', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const updateItem = async (id, data, isFormData = false) => {
    if (isFormData) {
      await api.post(`/items/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      await api.put(`/items/${id}`, data);
    }
    fetchMyItems();
  };

  const deleteItem = async (id) => {
    await api.delete(`/items/${id}`);
    fetchMyItems();
  };

  return (
    <ItemsContext.Provider value={{items,myItems,loading,fetchItems,fetchMyItems,createItem,updateItem,deleteItem,}}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}
