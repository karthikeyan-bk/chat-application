import React from "react";
import StatusBadge from "../common/StatusBadge";

 const UserModal = ({ user, isOpen, onClose }) => {
    if (!isOpen || !user) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                <StatusBadge status={user.status} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Join Date</label>
                <p className="text-gray-900 dark:text-white">{user.joinDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                <p className="text-gray-900 dark:text-white capitalize">{user.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Messages</label>
                <p className="text-gray-900 dark:text-white">{user.messagesCount.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Channels</label>
                <p className="text-gray-900 dark:text-white">{user.channelsCount}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Active Sessions</h4>
              <div className="space-y-2">
                {sessions.filter(s => s.userId === user.id).map(session => (
                  <div key={session.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{session.device}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{session.location}</p>
                      </div>
                      <button
                        onClick={() => setShowConfirmDialog({ 
                          type: 'terminateSession', 
                          sessionId: session.id,
                          title: 'Terminate Session',
                          message: 'Are you sure you want to terminate this session? The user will be logged out.'
                        })}
                        className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm transition-colors"
                      >
                        Terminate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowConfirmDialog({ 
                  type: 'banUser', 
                  userId: user.id,
                  title: 'Ban User',
                  message: `Are you sure you want to ban ${user.name}? They will be unable to access the chat application.`
                })}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                <Ban size={16} />
                Ban User
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <Edit3 size={16} />
                Edit User
              </button>
              <button
                onClick={() => setShowConfirmDialog({ 
                  type: 'terminateAllSessions', 
                  userId: user.id,
                  title: 'Terminate All Sessions',
                  message: `Are you sure you want to terminate all sessions for ${user.name}? They will be logged out from all devices.`
                })}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                Force Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default UserModal;
