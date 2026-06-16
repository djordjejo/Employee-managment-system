import Department from "./Department.jsx";


export default function SideBar({activeView, onViewChange}) {
    
   const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'employees', label: 'Employees', icon: '👥' },
    { id: 'departments', label: 'Departments', icon: '🏢' },
    { id: 'projects', label: 'Projects', icon: '📁' },
  ];
    return (
        <div className="flex flex-col justify-between h-full">
            <nav className="space-y-2">
                 <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                    activeView === item.id
                        ? 'bg-white/20 text-white font-semibold'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                </button>
                ))}
            </nav>

            <div className="mt-10">
            <p className="text-xs text-white/60 mb-2">Department</p>
            <Department label="UI/UX Design" color="bg-orange-400" />
            <Department label="Art & Design" color="bg-purple-400" />
            <Department label="Development" color="bg-emerald-400" />
            </div>
        </div>
    );
}