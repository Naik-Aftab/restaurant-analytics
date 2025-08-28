import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function DailyRevenueChart({ data }) {
  const formatted = (data || []).map(d => ({ date: d.date, revenue: Number(d.revenue) }));
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(val)=>`₹${Number(val).toFixed(2)}`} />
          <Line type="monotone" dataKey="revenue" stroke="#10B981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
