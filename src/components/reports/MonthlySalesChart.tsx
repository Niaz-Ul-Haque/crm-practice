// src/components/reports/MonthlySalesChart.tsx
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { SalesData } from "@/data/reportsData";
import { formatCurrency } from "@/lib/formatters";

interface MonthlySalesChartProps {
  data: SalesData[];
}

const MonthlySalesChart: React.FC<MonthlySalesChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#82ca9d"
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip
          formatter={(value, name) => {
            if (name === "revenue" || name === "target") {
              return [formatCurrency(value as number), name];
            }
            return [value, name];
          }}
        />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="policies"
          fill="#8884d8"
          name="Policies Sold"
        />
        <Bar
          yAxisId="right"
          dataKey="revenue"
          fill="#82ca9d"
          name="Revenue ($)"
        />
        <ReferenceLine
          yAxisId="right"
          y={45000}
          label="Target"
          stroke="red"
          strokeDasharray="3 3"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlySalesChart;
