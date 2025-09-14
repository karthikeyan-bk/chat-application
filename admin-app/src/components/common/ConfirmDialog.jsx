import React from "react";


  const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${type === 'danger' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'}`}>
              <AlertTriangle size={20} className={type === 'danger' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-lg transition-colors ${
                type === 'danger' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-yellow-600 hover:bg-yellow-700'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ConfirmDialog;
