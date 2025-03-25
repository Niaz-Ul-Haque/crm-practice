// src/components/dashboard/MonthlyRenewalsChart.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

interface MonthlyRenewalsChartProps {
  data: {
    labels: string[];
    datasets: {
      name: string;
      data: number[];
      color?: string;
    }[];
  };
}

const MonthlyRenewalsChart: React.FC<MonthlyRenewalsChartProps> = ({
  data,
}) => {
  const chartData = data.labels.map((month, index) => {
    const dataPoint: any = { month };

    data.datasets.forEach((dataset) => {
      dataPoint[dataset.name] = dataset.data[index];
    });

    return dataPoint;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-72"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {data.datasets.map((dataset, index) => (
            <Bar
              key={dataset.name}
              dataKey={dataset.name}
              fill={
                dataset.color ||
                `#${Math.floor(Math.random() * 16777215).toString(16)}`
              }
              stackId={dataset.name === 'Policy Renewals' ? 'a' : 'b'}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default MonthlyRenewalsChart;
