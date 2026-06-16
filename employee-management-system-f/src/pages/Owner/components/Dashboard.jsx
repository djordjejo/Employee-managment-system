import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('week');

  // Mock data
  const employeeGrowth = [
    { month: 'Jan', employees: 145, revenue: 85000 },
    { month: 'Feb', employees: 158, revenue: 92000 },
    { month: 'Mar', employees: 167, revenue: 98000 },
    { month: 'Apr', employees: 182, revenue: 105000 },
    { month: 'May', employees: 195, revenue: 112000 },
    { month: 'Jun', employees: 210, revenue: 125000 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 45, color: '#4f46e5' },
    { name: 'Sales', value: 28, color: '#06b6d4' },
    { name: 'Marketing', value: 18, color: '#8b5cf6' },
    { name: 'HR', value: 12, color: '#ec4899' },
    { name: 'Finance', value: 15, color: '#f59e0b' },
  ];

  const projectStats = [
    { status: 'Completed', count: 42 },
    { status: 'In Progress', count: 28 },
    { status: 'Planned', count: 15 },
    { status: 'On Hold', count: 5 },
  ];

  const weeklyActivity = [
    { day: 'Mon', tasks: 24, meetings: 8 },
    { day: 'Tue', tasks: 31, meetings: 12 },
    { day: 'Wed', tasks: 28, meetings: 6 },
    { day: 'Thu', tasks: 35, meetings: 10 },
    { day: 'Fri', tasks: 29, meetings: 14 },
    { day: 'Sat', tasks: 12, meetings: 2 },
    { day: 'Sun', tasks: 8, meetings: 1 },
  ];

  const stats = [
    { 
      label: 'Total Employees', 
      value: '210', 
      change: '+12.5%', 
      trend: 'up',
      icon: '👥',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Active Projects', 
      value: '28', 
      change: '+8.2%', 
      trend: 'up',
      icon: '📊',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Departments', 
      value: '12', 
      change: '+2', 
      trend: 'up',
      icon: '🏢',
      color: 'from-pink-500 to-pink-600'
    },
    { 
      label: 'Avg. Productivity', 
      value: '87%', 
      change: '+3.1%', 
      trend: 'up',
      icon: '⚡',
      color: 'from-orange-500 to-orange-600'
    },
  ];

  const recentActivity = [
    { user: 'Sarah Chen', action: 'completed project "Q2 Marketing Campaign"', time: '5 min ago', avatar: '🎨' },
    { user: 'Mike Johnson', action: 'joined Engineering department', time: '23 min ago', avatar: '💻' },
    { user: 'Emma Davis', action: 'updated employee profile', time: '1 hour ago', avatar: '✏️' },
    { user: 'Alex Turner', action: 'scheduled team meeting', time: '2 hours ago', avatar: '📅' },
    { user: 'Lisa Wang', action: 'submitted expense report', time: '3 hours ago', avatar: '💰' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
       
        <div className="flex gap-2">
          {['day', 'week', 'month'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeframe === tf
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
            <div className={`bg-gradient-to-br ${stat.color} p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{stat.icon}</span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  {stat.change}
                </span>
              </div>
              <div className="text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Employee Growth & Revenue</h3>
            <span className="text-sm text-gray-500">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={employeeGrowth}>
              <defs>
                <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis yAxisId="left" stroke="#9ca3af" />
              <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="employees" stroke="#4f46e5" fillOpacity={1} fill="url(#colorEmployees)" />
              <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#06b6d4" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="tasks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="meetings" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Project Status</h3>
          <div className="space-y-4">
            {projectStats.map((project, idx) => {
              const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-gray-500'];
              const percentage = (project.count / 90) * 100;
              return (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{project.status}</span>
                    <span className="text-sm font-bold text-gray-900">{project.count}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${colors[idx]} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
                {activity.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{activity.user}</span>{' '}
                  <span className="text-gray-600">{activity.action}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}