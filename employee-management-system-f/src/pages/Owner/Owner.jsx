import SideBar from "./components/SideBar.jsx";
import Filter from "./components/Filter.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import AddEmployee from "./components/AddEmployee.jsx"; 
import DepartmentList from "./components/DepartmentList.jsx"; 
import Dashboard from "./components/Dashboard.jsx"; 
import { useState } from "react";

export default function Owner() {
  const [activeView, setActiveView] = useState('employees'); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [addEmployee, setAddEmployee] = useState(false); 

  function handleAddEmployee() {
    setAddEmployee(true);
  }

  const getPageTitle = () => {
    switch(activeView) {
      case 'dashboard': return 'Dashboard';
      case 'employees': return 'Employee';
      case 'departments': return 'Departments';
      case 'projects': return 'Projects';
      default: return 'Employee';
    }
  };

  const getPageSubtitle = () => {
    switch(activeView) {
      case 'dashboard': return 'Overview of your organization';
      case 'employees': return 'Manage your employee';
      case 'departments': return 'Manage departments';
      case 'projects': return 'Manage projects';
      default: return 'Manage your employee';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gradient-to-b from-[#4f46e5] to-[#312e81] text-white p-6">
        <SideBar activeView={activeView} onViewChange={setActiveView} />
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{getPageTitle()}</h1>
          <p className="text-gray-500 mt-2 mb-3">{getPageSubtitle()}</p>
        </div>

          {activeView === 'employees' && (
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-200 rounded-md text-sm">
                Export
              </button>
              <button 
                onClick={handleAddEmployee} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm"
              >
                + Add Employee
              </button>
            </div>
          )}

          {activeView === 'departments' && (
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">
              + Add Department
            </button>
          )}
        </div>
        
        {(activeView === 'employees' || activeView === 'departments') && (
          <div className="flex gap-3 mb-6">
            <input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-md border text-sm w-64"
            />
            <Filter label="Sort ascending" />
            <Filter 
              onClick={() => setActiveView('departments')} 
              label="Department" 
            />
            <Filter label="Nesto" />
          </div>
        )}

        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'employees' && <EmployeeList searchTerm={searchTerm} />}
        {activeView === 'departments' && <DepartmentList searchTerm={searchTerm} />}
        {activeView === 'projects' && <div className="bg-white p-6 rounded-lg shadow">Projects coming soon...</div>}
      </main>
      
      {addEmployee && <AddEmployee onClose={() => setAddEmployee(false)} />}
    </div>
  );
}