import TypeBadge from './TypeBadge';

export default function AdminItemRow({ item, onUpdateStatus, onDelete }) {
  return (
    <tr>
      <td>
        {item.image && (
          <img
            src={`http://localhost:8000/storage/${item.image}`}
            alt={item.title}
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
        )}
      </td>
      <td>{item.title}</td>
      <td>
        <TypeBadge type={item.type} />
      </td>
      <td>{item.user?.name}</td>
      <td>
        <select
          value={item.status}
          onChange={(e) => onUpdateStatus(item.id, e.target.value)}
        >
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
        </select>
      </td>
      <td>
        <button onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
