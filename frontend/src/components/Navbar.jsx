import { Wallet } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                    <Wallet className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">ExpenseTracker</h1>
            </div>
        </nav>
    );
};

export default Navbar;
