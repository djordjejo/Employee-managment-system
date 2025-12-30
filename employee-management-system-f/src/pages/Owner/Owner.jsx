import SideBar from  "./components/SideBar.jsx";
import Filter from "./components/Filter.jsx";
import EmployeeRow from "./components/EmployeeRow.jsx"; 
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

      
        <div className="bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="p-4">Name</th>
                <th>ID</th>
                <th>E-mail</th>
                <th>Department</th>
                <th>Designation</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              <EmployeeRow
                name="Riyad Ahmad"
                email="uiriyad@gmail.com"
                department="Art & Design"
                deptColor="bg-purple-100 text-purple-600"
                role="Sr Product Designer"
              />
              <EmployeeRow
                name="Charles T"
                email="ahmedriyad338@gmail.com"
                department="Development"
                deptColor="bg-emerald-100 text-emerald-600"
                role="Sr UI Designer"
              />
              <EmployeeRow
                name="Nahid Miah"
                email="uiriyad1999@gmail.com"
                department="UI/UX Design"
                deptColor="bg-orange-100 text-orange-600"
                role="Jr UX Designer"
              />
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
