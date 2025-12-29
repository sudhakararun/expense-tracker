import { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import { deleteExpense } from '../services/api';
import ConfirmModal from './ConfirmModal';

const ExpenseList = ({ expenses, onExpenseDeleted, onEditExpense }) => {
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

    const handleDeleteClick = (id) => {
        setDeleteModal({ isOpen: true, id });
    };

    const handleConfirmDelete = async () => {
        try {
            if (deleteModal.id) {
                await deleteExpense(deleteModal.id);
                onExpenseDeleted();
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        } finally {
            setDeleteModal({ isOpen: false, id: null });
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-900">Description</th>
                                <th className="px-6 py-4 font-semibold text-slate-900">Category</th>
                                <th className="px-6 py-4 font-semibold text-slate-900">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-900">Amount</th>
                                <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {expenses.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                        No expenses found. Add one to get started!
                                    </td>
                                </tr>
                            ) : (
                                expenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-slate-50 transition group">
                                        <td className="px-6 py-4 font-medium text-slate-900">{expense.description}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{expense.date}</td>
                                        <td className="px-6 py-4 font-semibold text-slate-900">${Number(expense.amount).toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => onEditExpense(expense)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    title="Edit expense"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(expense.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    title="Delete expense"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, id: null })}
                onConfirm={handleConfirmDelete}
                title="Delete Expense"
                message="Are you sure you want to delete this expense? This action cannot be undone."
            />
        </>
    );
};

export default ExpenseList;
