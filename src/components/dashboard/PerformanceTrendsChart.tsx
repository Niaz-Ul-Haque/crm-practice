// src/components/dashboard/PerformanceTrendsChart.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

interface PerformanceTrendsChartProps {
  data: {
    labels: string[];
    datasets: {
      name: string;
      data: number[];
      color?: string;
    }[];
  };
}

const PerformanceTrendsChart: React.FC<PerformanceTrendsChartProps> = ({
  data,
}) => {
  const chartData = data.labels.map((week, index) => {
    const dataPoint: any = { week };

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
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />

          {data.datasets.map((dataset, index) => {
            if (dataset.name.includes('Revenue')) {
              return (
                <Line
                  key={dataset.name}
                  yAxisId="right"
                  type="monotone"
                  dataKey={dataset.name}
                  stroke={dataset.color || '#10B981'}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              );
            } else {
              return (
                <Line
                  key={dataset.name}
                  yAxisId="left"
                  type="monotone"
                  dataKey={dataset.name}
                  stroke={dataset.color || '#4F46E5'}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              );
            }
          })}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PerformanceTrendsChart;
