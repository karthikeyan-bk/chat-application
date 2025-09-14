import React from "react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
      online: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', text: 'Online' },
      away: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', text: 'Away' },
      offline: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', text: 'Offline' },
      banned: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', text: 'Banned' },
      active: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', text: 'Active' },
      idle: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', text: 'Idle' }
    };

    const config = statusConfig[status] || statusConfig.offline;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${status === 'online' || status === 'active' ? 'bg-green-400' : status === 'away' || status === 'idle' ? 'bg-yellow-400' : status === 'banned' ? 'bg-red-400' : 'bg-gray-400'}`}></div>
        {config.text}
      </span>
    );
};

export default StatusBadge;
