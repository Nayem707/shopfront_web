import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', orders: 24 },
  { day: 'Tue', orders: 31 },
  { day: 'Wed', orders: 19 },
  { day: 'Thu', orders: 28 },
  { day: 'Fri', orders: 35 },
  { day: 'Sat', orders: 42 },
  { day: 'Sun', orders: 22 },
];

export default function OrdersChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#ddd6c4" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#14171f99' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#14171f99' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #ddd6c4', fontSize: 12 }}
            cursor={{ fill: '#f1ede2' }}
          />
          <Bar dataKey="orders" fill="#14171f" radius={[4, 4, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
