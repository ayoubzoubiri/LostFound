import React from "react";
import TypeBadge from "./TypeBadge";

export default function ItemCard({ item, actions }) {
  return (
    <div className="bg-[#005461] border rounded-2xl p-4 mb-4 flex flex-col h-full">
      <img src={`http://localhost:8000/storage/${item.image}`} alt={item.title}   className="w-full h-48 object-cover rounded-2xl mb-3"  />
     
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-amber-50">{item.title}</h3>
        <TypeBadge type={item.type} />
      </div>
      
      <p className="text-amber-50 text-md mb-4 grow">{item.description}</p>
      
      <div className="flex justify-between items-center text-md font-bold text-amber-50 mb-2">
        <p>{item.location}</p>
        <p>{new Date(item.date).toLocaleDateString()}</p>
      </div>
      
      {actions && <div className="flex gap-2 mt-2 ">{actions}</div>}
    </div>
  );
}
