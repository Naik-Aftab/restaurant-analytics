export default function PeakHourTable({ data }) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Peak Hour</th>
            <th className="p-2">Orders</th>
            <th className="p-2">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {(!data || data.length === 0) && (
            <tr><td className="p-2" colSpan="4">No data</td></tr>
          )}
          {data && data.map(d => (
            <tr key={d.date}>
              <td className="p-2">{d.date}</td>
              <td className="p-2">{d.hour}:00</td>
              <td className="p-2">{d.orders_count}</td>
              <td className="p-2">₹{Number(d.revenue).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
