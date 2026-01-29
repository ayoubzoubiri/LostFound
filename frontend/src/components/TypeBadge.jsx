import React from 'react';

export default function TypeBadge({ type }) {
  const isLost = type === 'lost';
  return (
    <span className={`px-2 py-1 rounded text-md font-bold ${isLost ? 'bg-[#018790] text-[#F4F4F4]' : 'bg-[#018790] text-[#F4F4F4]'}`}>
      {type}
    </span>
  );
}
