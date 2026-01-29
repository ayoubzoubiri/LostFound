import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import ItemForm from '../components/ItemForm';

export default function DeclareItem() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { createItem } = useItems();
  const navigate = useNavigate();

  const handleSubmit = async (formData, image) => {
    setError('');
    
    if (!image) {
      setError('Image is required');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append('image', image);

      await createItem(data);
      navigate('/my-items');
    } catch (err) {
      if (err.response?.data?.message) {
         setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
         const errors = Object.values(err.response.data.errors).flat();
         setError(errors.join(', '));
      } else {
         setError('Failed to create item');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Declare an Item</h1>
      {error && <p>{error}</p>}
      <ItemForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
