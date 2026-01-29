import { useState, useEffect } from 'react';

export default function ItemForm({ initialData = {}, onSubmit, onCancel, submitLabel = 'Submit', loading }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'lost',
    location: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
        setFormData({
            title: initialData.title || '',
            description: initialData.description || '',
            type: initialData.type || 'lost',
            location: initialData.location || '',
            date: initialData.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
        });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, image);
  };

  return (
      <form onSubmit={handleSubmit}>
        <select
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          required
        />

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />

        <div>
          <label>{initialData.id ? 'Change Image' : 'Image'}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required={!initialData.id}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : submitLabel}
        </button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </form>
  );
}
