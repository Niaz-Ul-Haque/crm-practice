// src/components/dashboard/MonthlyRenewalsChart.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface MonthlyRenewalData {
  name: string;
  value: number;
}

interface MonthlyRenewalsChartProps {
  data: {
    labels: string[];
    data: number[];
  };
}

const MonthlyRenewalsChart: React.FC<MonthlyRenewalsChartProps> = ({
  data,
}) => {
  const chartData: MonthlyRenewalData[] = data.labels.map((label, index) => ({
    name: label,
    value: data.data[index],
  }));

  const currentMonthIndex = new Date().getMonth();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: "#E5E7EB" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: "#E5E7EB" }}
          tickLine={false}
        />
        <Tooltip
          formatter={(value: number) => [`${value} policies`, "Renewals"]}
          contentStyle={{
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            border: "none",
          }}
        />
        <Bar dataKey="value" fill="#F03BF6FF" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === currentMonthIndex ? "#8B25EBFF" : "#F03BF6FF"}
              fillOpacity={index === currentMonthIndex ? 1 : 0.75}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyRenewalsChart;
