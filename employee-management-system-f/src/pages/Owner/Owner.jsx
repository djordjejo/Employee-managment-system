import SideBar from "./components/SideBar.jsx";
import Filter from "./components/Filter.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import AddEmployee from "./components/AddEmployee.jsx"; 
import AddDepartment from "./components/AddDepartment.jsx"; 
import DepartmentList from "./components/DepartmentList.jsx"; 
import Dashboard from "./components/Dashboard.jsx"; 
import ProjectList from "./components/ProjectList.jsx"; 
import { useState } from "react";

export default function Owner() {
  const [activeView, setActiveView] = useState('employees'); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [addEmployee, setAddEmployee] = useState(false); 
  const [addDepartment, setAddDepartment] = useState(false); 

  const getPageTitle = () => {
    switch(activeView) {
      case 'dashboard': return 'Dashboard';
      case 'employees': return 'Employees';
      case 'departments': return 'Departments';
      case 'projects': return 'Projects';
      default: return 'Employees';
    }
  };

  const getPageSubtitle = () => {
    switch(activeView) {
      case 'dashboard': return 'Overview of your organization';
      case 'employees': return 'Manage your employees';
      case 'departments': return 'Manage departments';
      case 'projects': return 'Manage projects';
      default: return 'Manage your employees';
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

          {/* ✅ Employee buttons */}
          {activeView === 'employees' && (
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300 transition">
                Export
              </button>
              <button 
                onClick={() => setAddEmployee(true)} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
              >
                + Add Employee
              </button>
            </div>
          )}

          {activeView === 'departments' && (
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300 transition">
                Export
              </button>
              <button 
                onClick={() => setAddDepartment(true)} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
              >
                + Add Department 
              </button>
            </div>
          )}
        </div>
        
         {(activeView === 'employees' || activeView === 'departments') && (
          <div className="flex gap-3 mb-6 mt-6">
            <input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-md border text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Filter label="Sort ascending" />
            <Filter 
              onClick={() => setActiveView('departments')} 
              label="Department" 
            />
            <Filter label="Status" />
          </div>
        )}

        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'employees' && <EmployeeList searchTerm={searchTerm} />}
        {activeView === 'departments' && <DepartmentList searchTerm={searchTerm} />}
        {activeView === 'projects' && <ProjectList searchTerm = {searchTerm}/>}
      </main>
      
      {addEmployee && (
        <AddEmployee 
          onClose={() => setAddEmployee(false)}
          onSuccess={() => setAddEmployee(false)} 
        />
      )}

      {addDepartment && (
        <AddDepartment 
          onClose={() => setAddDepartment(false)}
          onSuccess={() => setAddDepartment(false)}
        />
      )}
    </div>
  );
}