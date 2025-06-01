import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const UsageCharts = ({ data }) => {
  console.log("Chart Data:", data); 

  
  const cleanedData = data.map((entry, index) => ({
    ...entry,
    usage: parseInt(entry.usage) || 0,
    date: entry.date || `Entry ${index + 1}`
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      {cleanedData.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No usage data to show yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cleanedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usage" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UsageCharts;