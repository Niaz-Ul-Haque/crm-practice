// src/components/reports/PolicyDistributionChart.tsx
'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { PolicyDistribution } from '@/data/reportsData';
import { formatCurrency } from '@/lib/formatters';

interface PolicyDistributionChartProps {
  data: PolicyDistribution[];
  dataKey?: 'count' | 'revenue';
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#FFC658',
];

const PolicyDistributionChart: React.FC<PolicyDistributionChartProps> = ({
  data,
  dataKey = 'count',
}) => {
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey="type"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => {
            if (dataKey === 'revenue') {
              return [formatCurrency(value as number), name];
            }
            return [value, name];
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PolicyDistributionChart;
