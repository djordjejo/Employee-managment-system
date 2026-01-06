import SideBar from  "./components/SideBar.jsx";
import Filter from "./components/Filter.jsx";
import EmployeeList from "./components/EmployeeList.jsx"; 
export default function Owner() {
    return (
        
      <div className="flex min-h-screen bg-gray-100">
   
      <aside className="w-64 bg-gradient-to-b from-[#4f46e5] to-[#312e81] text-white p-6">
        <SideBar />
      </aside>

    
      <main className="flex-1 p-8">
     
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Employee</h2>
            <p className="text-sm text-gray-500">Manage your employee</p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-200 rounded-md text-sm">
              Export
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">
              + Add Employee
            </button>
          </div>
        </div>

        
        <div className="flex gap-3 mb-6">
          <input
            placeholder="Search"
            className="px-4 py-2 rounded-md border text-sm w-64"
          />
          <Filter label="Sort By: New Employees" />
          <Filter label="Department" />
          <Filter label="Designation" />
        </div>

        <EmployeeList />
      </main>
    </div>
  );
}
