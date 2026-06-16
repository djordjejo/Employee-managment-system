import {useState, useEffect} from 'react';
import PopUp from './PopUp';  

function EmployeeList({ searchTerm }) {  

    const [employees, setEmployees] = useState([]);
    const [employeeDetails, setEmployeeDetails] = useState(null);
    
    useEffect(() => {
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
    }, []);

    function handleSeeDetails(employee){
        setEmployeeDetails(employee);
    }

    const filteredEmployees = employees.filter((employee) => {
        if (!searchTerm) return true; 
        
        const search = searchTerm.toLowerCase();
        return (
            employee.fullName?.toLowerCase().includes(search) ||
            employee.email?.toLowerCase().includes(search) ||
            employee.id?.toString().includes(search) ||
            employee.departmentName?.toLowerCase().includes(search) ||
            employee.companyName?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            {searchTerm && (
                <div className="bg-indigo-50 px-4 py-2 text-sm text-indigo-700 border-b">
                    Found {filteredEmployees.length} employee(s) matching "{searchTerm}"
                </div>
            )}

            <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-500 uppercase text-xs">
                    <tr>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">ID</th>
                        <th className="p-4 text-left">E-mail</th>
                        <th className="p-4 text-left">Department</th>
                        <th className="p-4 text-left">Company</th>
                        <th className="p-4 text-left">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {filteredEmployees.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="p-8 text-center text-gray-500">
                                {searchTerm 
                                    ? `No employees found matching "${searchTerm}"` 
                                    : "No employees available"
                                }
                            </td>
                        </tr>
                    ) : (
                        filteredEmployees.map((employee) => (
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
                                <td className="p-4">{employee.companyName ?? "N/A"}</td>
                                <td className="p-4">{employee.departmentName ?? "N/A"}</td>
                                <td className="p-4">
                                    <button 
                                        onClick={() => handleSeeDetails(employee)} 
                                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                    >
                                        See Details
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {employeeDetails && (
                <PopUp
                    entity={employeeDetails} 
                    title={"Employees details:"} 
                    onClose={() => setEmployeeDetails(null)}
                    onSuccess={() => window.location.reload()}
                />
            )}
        </div>
    );
}

export default EmployeeList;