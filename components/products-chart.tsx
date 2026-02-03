"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mumbai", value: 40 },
  { name: "Delhi", value: 30 },
  { name: "Pune", value: 45 },
  { name: "Bangalore", value: 35 },
  { name: "Chennai", value: 50 },
];

export default function ProductsChart() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
        Top Cities
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
