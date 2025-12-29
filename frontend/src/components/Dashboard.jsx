import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1'];

const Dashboard = ({ expenses }) => {
    const totalExpenses = useMemo(() => {
        return expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
    }, [expenses]);

    const categoryData = useMemo(() => {
        const data = {};
        expenses.forEach(exp => {
            if (data[exp.category]) {
                data[exp.category] += Number(exp.amount);
            } else {
                data[exp.category] = Number(exp.amount);
            }
        });
        return Object.keys(data).map(key => ({ name: key, value: data[key] }));
    }, [expenses]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-blue-100 text-sm font-medium mb-1">Total Expenses</h3>
                <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
                <div className="mt-4 text-sm text-blue-200">
                    {expenses.length} transaction{expenses.length !== 1 && 's'} recorded
                </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Expenses by Category</h3>
                <div className="flex-1 min-h-[200px]">
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => `$${value.toFixed(2)}`}
                                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                />
                                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                            No data to display
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
