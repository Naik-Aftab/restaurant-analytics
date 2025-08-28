import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function DailyOrdersChart({ data }) {
  const formatted = (data || []).map(d => ({ date: d.date, orders: d.orders_count }));
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#4F46E5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
