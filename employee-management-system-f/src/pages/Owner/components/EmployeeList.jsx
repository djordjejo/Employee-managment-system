import {useState, useEffect} from 'react';

function EmployeeList(){

    const [employees, setEmployees] = useState([]);
    
    useEffect( () =>{
        async function fetchEmployees(){
            try{
                const response = await fetch('/api/employees');
                const data = await response.json();
                setEmployees(data);
            } catch(error){
                console.error('Error fetching employees:', error);
            }
        }        
        fetchEmployees();

    }, [])
    return (
  <div className="bg-white rounded-xl shadow overflow-hidden">
  <table className="w-full text-sm text-gray-700">
    <thead className="bg-gray-100 text-gray-500 uppercase text-xs">
      <tr>
        <th className="p-4 text-left">Name</th>
        <th className="p-4 text-left">ID</th>
        <th className="p-4 text-left">E-mail</th>
        <th className="p-4 text-left">Department</th>
        <th className="p-4 text-left">Designation</th>
        <th className="p-4 text-left">Action</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
      {employees.map((employee) => (
        <tr
          key={employee.id}
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          <td className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0" />
            <span className="font-medium">{employee.fullName}</span>
          </td>
          <td className="p-4">{employee.id}</td>
          <td className="p-4">{employee.email}</td>
          <td className="p-4">{employee.department ?? "N/A"}</td>
          <td className="p-4">{employee.designation ?? "N/A"}</td>
          <td className="p-4">
            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
              See Details
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default EmployeeList;