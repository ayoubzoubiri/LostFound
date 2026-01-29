import TypeBadge from './TypeBadge';

export default function ItemCard({ item, actions }) {
  return (
    <div>
      {item.image && (
        <img
          src={`http://localhost:8000/storage/${item.image}`}
          alt={item.title}
        />
      )}
      <div>
        <h3>{item.title}</h3>
        <TypeBadge type={item.type} />
      </div>
      <p>{item.description}</p>
      <p>{item.location}</p>
      <p>{new Date(item.date).toLocaleDateString()}</p>
      {actions && <div>{actions}</div>}
    </div>
  );
}
