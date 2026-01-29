export default function StatCard({ label, value }) {
  return (
    <div>
      <p>{value}</p>
      <p>{label}</p>
    </div>
  );
}
