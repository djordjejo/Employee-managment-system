import { useState } from 'react';
import UpdateEmployee from './UpdateEmployee.jsx';
import UpdateDepartment from './UpdateDepartment .jsx';

export default function PopUp({ entity, title, onClose, onSuccess }) {
    const items = Array.isArray(entity) ? entity : [entity];
    const entityType = title.split(' ')[0];
    const [updateEmployee, setUpdateEmployee] = useState(false);
    const [updateDepartment, setUpdateDepartment] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
            console.log(entityType)

    const handleDeleteEmployee = async (entity) => {
        setLoading(true);
        setError(null);
        try {
                const response = await fetch(`api/Employees/${entity.id}`, {
                method: 'DELETE',
                headers: { 
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete');
            }

            onSuccess?.(); 
            onClose?.();    

        } catch (error) { 
            console.error('❌ Error deleting:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteDepartment = async (entity)=>
    {
        setLoading(true);
        setError(null);
        try {
                const response = await fetch(`https://localhost:7183/api/Department/${entity.id}`, {
                method: 'DELETE',
                headers: { 
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete');
            }

            onSuccess?.(); 
            onClose?.();    

        } catch (error) { 
            console.error('❌ Error deleting:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }
    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                        <button 
                            onClick={onClose}
                            className="text-white/80 hover:text-white text-3xl leading-none transition-colors"
                        >
                            ×
                        </button>
                    </div>
                   
                    <div className="flex-1 overflow-y-auto p-6">
                        {items.map((item) => {
                            if (entityType === "Department") {
                                return (
                                    <div key={item.id} className="space-y-4">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-500 mb-1">Department Name</p>
                                                    <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                                                </div>
                                            </div>
                                            <div className="border-t border-gray-200 pt-3 mt-3">
                                                <p className="text-sm text-gray-500 mb-1">Description</p>
                                                <p className="text-gray-700">{item.description || 'No description provided'}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            
                            if (entityType === "Employees") {
                                return (
                                    <div key={item.id} className="space-y-4">
                                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-5 border border-indigo-100">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                                    {item.firstName?.[0]}{item.lastName?.[0]}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800">
                                                        {item.firstName} {item.lastName}
                                                    </h3>
                                                    <p className="text-sm text-indigo-600 font-medium">{item.departmentName}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg border border-gray-200 divide-y">
                                            <div className="p-4 flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500">Email</p>
                                                    <p className="text-sm font-medium text-gray-800">{item.email}</p>
                                                </div>
                                            </div>
                                            
                                            {item.phoneNumber && (
                                                <div className="p-4 flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-gray-500">Phone Number</p>
                                                        <p className="text-sm font-medium text-gray-800">{item.phoneNumber}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {item.projects && item.projects.length > 0 && (
                                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                    </div>
                                                    <p className="font-semibold text-gray-800">
                                                        Projects ({item.projects.length})
                                                    </p>
                                                </div>
                                                <div className="space-y-2">
                                                    {item.projects.map((project) => (
                                                        <div 
                                                            key={project.id}
                                                            className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-100"
                                                        >
                                                            <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                                                            <span className="text-sm text-gray-700 font-medium">{project.title}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            } 
                            
                            return null;
                        })}
                    </div>

                    <div className="flex justify border-t bg-gray-50 px-6 py-4 gap-3">
                        <button 
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
                        >
                            Close
                        </button>
                        {entityType === "Employees" ? (
                            <div className="flex-1 flex gap-3">
                                <button 
                                    onClick={() => setUpdateEmployee(true)}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/50"
                                >
                                    Update
                                </button>
                                <button 
                                    onClick={() => handleDeleteEmployee(items[0])}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/50"
                                >
                                    Delete
                                </button>
                            </div>
                        ) : entityType === "Department" ?  (
                             <div className="flex-1 flex gap-3">
                                <button 
                                    onClick={() => setUpdateDepartment(true)}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/50"
                                >
                                    Update
                                </button>
                                <button 
                                    onClick={() => handleDeleteDepartment(items[0])}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/50"
                                >
                                    Delete
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {updateEmployee && (
                <UpdateEmployee 
                    entity={items[0]} 
                    onClose={() => setUpdateEmployee(false)}
                    onSuccess={() => {
                        setUpdateEmployee(false);
                        onSuccess?.();
                        onClose();
                    }}
                />
            )}
             {updateDepartment && (
                <UpdateDepartment 
                    entity={items[0]} 
                    onClose={() => setUpdateDepartment(false)}
                    onSuccess={() => {
                        setUpdateDepartment(false);
                        onSuccess?.();
                        onClose();
                    }}
                />
            )}
        </>
    );
}