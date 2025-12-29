import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { getExpenses } from './services/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    // Scroll to form on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Dashboard expenses={expenses} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ExpenseForm
              onExpenseAdded={() => {
                fetchExpenses();
                setEditingExpense(null);
              }}
              expenseToEdit={editingExpense}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Transactions</h2>
            {loading ? (
              <div className="text-center py-10 text-slate-500">Loading expenses...</div>
            ) : (
              <ExpenseList
                expenses={expenses}
                onExpenseDeleted={fetchExpenses}
                onEditExpense={handleEditExpense}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
