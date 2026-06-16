import { useState, useEffect } from "react";
import PopUp from "./PopUp.jsx";

function DepartmentList({searchTerm}){
    const [departments, setDepartments] = useState([]);
    const [departmentDetails, setDepartmentDetails] = useState(null);

    useEffect(() => {
        async function fetchDepartments(){
            try{
                const response = await fetch('/api/department');
                const data = await response.json();
                setDepartments(data);
            } catch(error){
                console.error('Error fetching departments:', error);
            }
        }        
        fetchDepartments();
    }, []);

    function handleSeeDetails(department){
        setDepartmentDetails(department);
    }

    const filteredDepartments = departments.filter((department) => {
        if (!searchTerm) return true; 

        const search = searchTerm.toLowerCase();
        return (
            department.name?.toLowerCase().includes(search) ||
            department.description?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            {searchTerm && (
                <div className="bg-indigo-50 px-4 py-2 text-sm text-indigo-700 border-b">
                    Found {filteredDepartments.length} department(s) matching "{searchTerm}"
                </div>
            )}

            <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-500 uppercase text-xs">
                    <tr>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Description</th>
                        <th className="p-4 text-left">Action</th>
                    </tr>
                </thead>
            
                <tbody className="divide-y divide-gray-200">
                    {filteredDepartments.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="p-8 text-center text-gray-500">
                                {searchTerm 
                                    ? `No departments found matching "${searchTerm}"` 
                                    : "No departments available"
                                }
                            </td>
                        </tr>
                    ) : (
                        filteredDepartments.map((department) => (
                            <tr
                                key={department.id}
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0" />
                                    <span className="font-medium">{department.name}</span>
                                </td>
                                <td className="p-4">{department.description}</td>
                                <td className="p-4">
                                    <button 
                                        onClick={() => handleSeeDetails(department)} 
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

            {departmentDetails && (
                <PopUp 
                    entity={departmentDetails} 
                    title="Department details" 
                    onClose={() => setDepartmentDetails(null)}
                    onSuccess={()=> window.location.reload()}
                />
            )}
        </div>
    );
}

export default DepartmentList;