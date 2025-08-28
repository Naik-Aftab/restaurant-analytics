import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function AvgOrderValueChart({ data }) {
  const formatted = (data || []).map(d => ({ date: d.date, avg: Number(d.avg_order_value) }));
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(val)=>`₹${Number(val).toFixed(2)}`} />
          <Line type="monotone" dataKey="avg" stroke="#F59E0B" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
