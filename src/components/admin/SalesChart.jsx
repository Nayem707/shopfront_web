import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Mar', revenue: 18200, orders: 142 },
  { month: 'Apr', revenue: 21400, orders: 168 },
  { month: 'May', revenue: 19800, orders: 155 },
  { month: 'Jun', revenue: 24600, orders: 190 },
  { month: 'Jul', revenue: 27200, orders: 205 },
  { month: 'Aug', revenue: 25100, orders: 198 },
  { month: 'Sep', revenue: 31400, orders: 232 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-paper-line bg-white px-3.5 py-2.5 shadow-pop">
      <p className="text-xs font-medium text-ink/50">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold text-ink">${payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export default function SalesChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#b08d57" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#b08d57" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#ddd6c4" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#14171f99' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#14171f99' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="revenue" stroke="#b08d57" strokeWidth={2} fill="url(#revenueFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
