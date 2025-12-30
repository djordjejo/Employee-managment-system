import SidebarItem from "./SidebarItem.jsx";
import Department from "./Department.jsx";
export default function SideBar() {
    return (
        <div>
            <h1 className="text-xl font-semibold mb-8">Worksy</h1>

            <nav className="space-y-2 text-sm">
            <SidebarItem label="Dashboard" />
            <SidebarItem label="Recruitment" />
            <SidebarItem label="Employee" active />
            <SidebarItem label="Attendance" />
            <SidebarItem label="Task" />
            <SidebarItem label="Payroll" />
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