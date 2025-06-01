import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const UsageByCategoryPie = ({ usageLog, categories }) => {
  const pieData = categories
    .map(cat => ({
      name: cat,
      value: usageLog.filter(u => u.category === cat).reduce((sum, u) => sum + u.usage, 0)
    }))
    .filter(d => d.value > 0);

  return (
    <div className="card" style={{paddingTop: '10px'}}>
      <h2 >Usage by Category</h2>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageByCategoryPie;