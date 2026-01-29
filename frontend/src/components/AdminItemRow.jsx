import React from 'react';
import TypeBadge from './TypeBadge';

export default function AdminItemRow({ item, onUpdateStatus, onDelete }) {
  return (
    <tr className="border-t">
      <td className="p-3">
        <img src={`http://localhost:8000/storage/${item.image}`} alt={item.title} className="w-16 h-16 object-cover rounded" />
      </td>
      <td className="p-3 text-md font-bold">{item.title}</td>
      <td className="p-3 ">
        <TypeBadge type={item.type} />
      </td>
      <td className="p-3 text-md font-bold">{item.user?.name}</td>
      <td className="p-3">
        <select value={item.status} onChange={(e) => onUpdateStatus(item.id, e.target.value)} className="border p-1 rounded text-md font-bold" >
          <option value="active" className=" rounded text-md font-bold">Active</option>
          <option value="resolved " className=" rounded text-md font-bold" >Resolved</option>
        </select>
      </td>
      <td className="p-3">
        <button onClick={() => onDelete(item.id)} className="text-red-600 text-md font-bold"> Delete </button>
      </td>
    </tr>
  );
}
