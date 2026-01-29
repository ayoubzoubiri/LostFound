import React from 'react';

export default function StatCard({ label, value }) {
  return (
    <div className="bg-white border rounded p-6 text-center flex-1">
      <p className="text-3xl font-bold text-blue-600">{value}</p>
      <p className="text-gray-500 text-sm mt-2">{label}</p>
    </div>
  );
}
