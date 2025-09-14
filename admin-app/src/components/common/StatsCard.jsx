import React from "react";
import { TrendingUp } from "lucide-react";


const StatsCard = ({ title, value, change,  icon: Icon, color = 'blue' }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value.toLocaleString()}</p>
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className={`text-${color === 'green' ? 'green' : 'blue'}-500 mr-1`} />
              <span className={`text-sm font-medium text-${color === 'green' ? 'green' : 'blue'}-600 dark:text-${color === 'green' ? 'green' : 'blue'}-400`}>
                +{change}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100 dark:bg-${color}-900/30`}>
          <Icon size={24} className={`text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
    </div>
);

export default StatsCard;
