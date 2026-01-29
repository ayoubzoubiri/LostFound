import React from 'react';

export default function StatusBadge({ status }) {
  const isActive = status === 'active';
  return (
    <span className={`px-2 py-1 rounded text-xs ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
      {status}
    </span>
  );
}
