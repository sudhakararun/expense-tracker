import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-red-100 p-3 rounded-full">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                        <button
                            onClick={onClose}
                            className="ml-auto text-slate-400 hover:text-slate-600 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <p className="text-slate-600 mb-6 leading-relaxed">
                        {message}
                    </p>

                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium shadow-sm transition flex items-center gap-2"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
