import { useState, useEffect } from 'react';
import { Plus, Save, X, Loader2 } from 'lucide-react';
import { createExpense, updateExpense } from '../services/api';

const ExpenseForm = ({ onExpenseAdded, expenseToEdit, onCancelEdit }) => {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (expenseToEdit) {
            setFormData({
                description: expenseToEdit.description,
                amount: expenseToEdit.amount,
                category: expenseToEdit.category,
                date: expenseToEdit.date
            });
        } else {
            setFormData({
                description: '',
                amount: '',
                category: 'Food',
                date: new Date().toISOString().split('T')[0]
            });
        }
    }, [expenseToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (expenseToEdit) {
                await updateExpense(expenseToEdit.id, formData);
                onCancelEdit();
            } else {
                await createExpense(formData);
                setFormData({
                    description: '',
                    amount: '',
                    category: 'Food',
                    date: new Date().toISOString().split('T')[0]
                });
            }
            onExpenseAdded();
        } catch (error) {
            console.error('Error saving expense:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    {expenseToEdit ? 'Edit Expense' : 'Add New Expense'}
                </h2>
                {expenseToEdit && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="text-slate-400 hover:text-slate-600 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="e.g., Grocery shopping"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                    <input
                        type="number"
                        required
                        step="0.01"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        placeholder="0.00"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option>Food</option>
                        <option>Transport</option>
                        <option>Utilities</option>
                        <option>Entertainment</option>
                        <option>Health</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-4">
                {expenseToEdit && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-lg transition"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-70`}
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : expenseToEdit ? (
                        <>
                            <Save className="w-4 h-4" /> Update Expense
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4" /> Add Expense
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
