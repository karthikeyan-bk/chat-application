import React, { useState, useEffect } from 'react';
import { 
  Users, MessageSquare, Activity, Settings, Search, Filter, Download, 
  MoreVertical, Eye, Ban, UserX, Shield, Clock, TrendingUp, AlertTriangle,
  RefreshCw, Calendar, BarChart3, PieChart, LogOut, Trash2, Edit3
} from 'lucide-react';
import ConfirmDialog from '../components/common/ConfirmDialog';
import StatsCard from '../components/common/StatsCard';
import StatusBadge from '../components/common/StatusBadge';
import UserModal from '../components/users/UserModal';  

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalMessages: 45623,
    activeSessions: 324,
    dailyGrowth: 5.2,
    messageGrowth: 12.8
  };

  const users = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      status: 'online', 
      lastSeen: 'Active now', 
      joinDate: '2024-01-15',
      messagesCount: 1234,
      channelsCount: 8,
      role: 'user',
      sessions: 2
    },
    { 
      id: 2, 
      name: 'Alice Smith', 
      email: 'alice@example.com', 
      status: 'away', 
      lastSeen: '5 minutes ago', 
      joinDate: '2024-02-20',
      messagesCount: 892,
      channelsCount: 12,
      role: 'moderator',
      sessions: 1
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      status: 'offline', 
      lastSeen: '2 hours ago', 
      joinDate: '2024-03-10',
      messagesCount: 456,
      channelsCount: 5,
      role: 'user',
      sessions: 0
    },
    { 
      id: 4, 
      name: 'Carol Williams', 
      email: 'carol@example.com', 
      status: 'banned', 
      lastSeen: '1 day ago', 
      joinDate: '2024-01-05',
      messagesCount: 2341,
      channelsCount: 15,
      role: 'user',
      sessions: 0
    }
  ];

  const sessions = [
    { 
      id: 'sess_1', 
      userId: 1, 
      userName: 'John Doe', 
      device: 'Chrome on Windows', 
      ipAddress: '192.168.1.100',
      location: 'New York, US',
      startTime: '2024-03-15 09:30:00',
      lastActivity: '2024-03-15 14:45:32',
      status: 'active'
    },
    { 
      id: 'sess_2', 
      userId: 2, 
      userName: 'Alice Smith', 
      device: 'Safari on iPhone', 
      ipAddress: '192.168.1.101',
      location: 'California, US',
      startTime: '2024-03-15 08:15:00',
      lastActivity: '2024-03-15 14:40:12',
      status: 'idle'
    },
    { 
      id: 'sess_3', 
      userId: 1, 
      userName: 'John Doe', 
      device: 'Mobile App on Android', 
      ipAddress: '192.168.1.102',
      location: 'New York, US',
      startTime: '2024-03-15 07:00:00',
      lastActivity: '2024-03-15 14:30:45',
      status: 'active'
    }
  ];

  const chatHistory = [
    {
      id: 1,
      channel: '#general',
      user: 'John Doe',
      message: 'Hey everyone, how is the project going?',
      timestamp: '2024-03-15 14:30:00',
      type: 'channel'
    },
    {
      id: 2,
      channel: 'Direct Message',
      user: 'Alice Smith',
      message: 'Can we schedule a meeting for tomorrow?',
      timestamp: '2024-03-15 14:25:00',
      type: 'direct'
    },
    {
      id: 3,
      channel: '#development',
      user: 'Bob Johnson',
      message: 'I found a bug in the latest build',
      timestamp: '2024-03-15 14:20:00',
      type: 'channel'
    }
  ];

  const handleConfirmAction = (action) => {
    console.log('Performing action:', action);
    // Here you would make API calls to perform the actual actions
    setShowConfirmDialog(null);
    setShowUserModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Chat Management</p>
            </div>
          </div>
        </div>

        <nav className="px-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'sessions', label: 'Sessions', icon: Activity },
            { id: 'chat-history', label: 'Chat History', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                {activeTab.replace('-', ' ')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {activeTab === 'dashboard' && 'Overview of your chat application'}
                {activeTab === 'users' && 'Manage users and their permissions'}
                {activeTab === 'sessions' && 'Monitor active user sessions'}
                {activeTab === 'chat-history' && 'View and moderate chat messages'}
                {activeTab === 'settings' && 'Configure application settings'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <RefreshCw size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-full">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Total Users"
                  value={stats.totalUsers}
                  change={stats.dailyGrowth}
                  icon={Users}
                  color="blue"
                />
                <StatsCard
                  title="Active Users"
                  value={stats.activeUsers}
                  icon={Activity}
                  color="green"
                />
                <StatsCard
                  title="Total Messages"
                  value={stats.totalMessages}
                  change={stats.messageGrowth}
                  icon={MessageSquare}
                  color="purple"
                />
                <StatsCard
                  title="Active Sessions"
                  value={stats.activeSessions}
                  icon={Clock}
                  color="orange"
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Activity</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <BarChart3 size={48} className="text-gray-400" />
                    <span className="ml-2 text-gray-500">Chart would go here</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Message Distribution</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <PieChart size={48} className="text-gray-400" />
                    <span className="ml-2 text-gray-500">Chart would go here</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {chatHistory.slice(0, 5).map(item => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white">
                            <span className="font-medium">{item.user}</span> sent a message in{' '}
                            <span className="font-medium text-blue-600 dark:text-blue-400">{item.channel}</span>
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                    <Users size={16} />
                    Add User
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Filter size={16} />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">User</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Role</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Messages</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Sessions</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <StatusBadge status={user.status} />
                          </td>
                          <td className="p-4">
                            <span className="capitalize text-gray-900 dark:text-white">{user.role}</span>
                          </td>
                          <td className="p-4 text-gray-900 dark:text-white">
                            {user.messagesCount.toLocaleString()}
                          </td>
                          <td className="p-4 text-gray-900 dark:text-white">
                            {user.sessions}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {setSelectedUser(user); setShowUserModal(true);}}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-400"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => setShowConfirmDialog({ 
                                  type: 'terminateUserSessions', 
                                  userId: user.id,
                                  title: 'Terminate User Sessions',
                                  message: `Are you sure you want to terminate all sessions for ${user.name}?`
                                })}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-400"
                              >
                                <LogOut size={16} />
                              </button>
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-400">
                                <MoreVertical size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors">
                    <UserX size={16} />
                    Terminate All
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Filter size={16} />
                    Filter by Status
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">User</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Device</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Location</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Last Activity</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {sessions.map(session => (
                        <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {session.userName.charAt(0)}
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">{session.userName}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-900 dark:text-white">{session.device}</td>
                          <td className="p-4 text-gray-900 dark:text-white">{session.location}</td>
                          <td className="p-4">
                            <StatusBadge status={session.status} />
                          </td>
                          <td className="p-4 text-gray-900 dark:text-white">{session.lastActivity}</td>
                          <td className="p-4">
                            <button
                              onClick={() => setShowConfirmDialog({ 
                                type: 'terminateSession', 
                                sessionId: session.id,
                                title: 'Terminate Session',
                                message: 'Are you sure you want to terminate this session?'
                              })}
                              className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm transition-colors"
                            >
                              <UserX size={14} />
                              Terminate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Chat History Tab */}
          {activeTab === 'chat-history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Calendar size={16} />
                    Date Range
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Filter size={16} />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="p-6 space-y-4">
                  {chatHistory.map(item => (
                    <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {item.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">{item.user}</span>
                          <span className="text-sm text-blue-600 dark:text-blue-400">{item.channel}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{item.timestamp}</span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200">{item.message}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-500 dark:text-gray-400">
                          <Edit3 size={14} />
                        </button>
                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <UserModal user={selectedUser} isOpen={showUserModal} onClose={() => setShowUserModal(false)} />
      
      <ConfirmDialog
        isOpen={!!showConfirmDialog}
        onClose={() => setShowConfirmDialog(null)}
        onConfirm={() => handleConfirmAction(showConfirmDialog)}
        title={showConfirmDialog?.title}
        message={showConfirmDialog?.message}
        type={showConfirmDialog?.type === 'banUser' ? 'danger' : 'warning'}
      />
    </div>
  );
};

export default AdminDashboard;