// src/components/dashboard/PerformanceTrendsChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PerformanceTrendsChartProps {
  data: {
    labels: string[];
    policies: number[];
    revenue: number[];
  };
}

const PerformanceTrendsChart: React.FC<PerformanceTrendsChartProps> = ({
  data,
}) => {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    policies: data.policies[index],
    revenue: data.revenue[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: "#E5E7EB" }}
          tickLine={false}
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: "#E5E7EB" }}
          tickLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: "#E5E7EB" }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            border: "none",
          }}
          formatter={(value, name) => {
            if (name === "revenue") return [`$${value}`, "Revenue"];
            return [value, "Policies Sold"];
          }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="policies"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="revenue"
          stroke="#10B981"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceTrendsChart;
