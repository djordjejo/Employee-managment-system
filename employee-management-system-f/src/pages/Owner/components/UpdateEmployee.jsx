import { useState, useEffect } from 'react';

export default function UpdateEmployee({ entity, onClose, onSuccess }) {
   
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        id: entity.id,
        firstName: entity.firstName || '',
        lastName: entity.lastName || '',
        email: entity.email || '',
        phoneNumber: entity.phoneNumber || '',
        departmentId: entity.department?.id || '', 
        departmentName: entity.departmentName || '',
        companyId: entity.companyId || entity.company?.id || '',
        isActive: entity.isActive ?? true,          
        projectIds: entity.projects?.map(p => p.id) || []
    });

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('/api/department');
                const data = await response.json();
                setDepartments(data);
            } catch(err) {
                console.error('Error fetching departments:', err);
            }
        }
        fetchDepartments();
    }, []);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleProject = (projectId) => {
        setFormData(prev => ({
            ...prev,
            projectIds: prev.projectIds.includes(projectId)
                ? prev.projectIds.filter(id => id !== projectId)
                : [...prev.projectIds, projectId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {

            if (!formData.departmentId) {
                throw new Error('Please select a department');
            }
            const response = await fetch(
                `https://localhost:7183/api/Employees/UpdateEmployee/${entity.id}`, 
                {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );
            if (response.status === 204) {
                onSuccess();
                onClose();
                return;
            }

            
            if (!response.ok) {
                console.error('❌ Error response:', data);
                
                if (data?.errors) {
                    const errorMessages = Object.entries(data.errors)
                        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');
                    throw new Error(errorMessages);
                }
                
                throw new Error(data?.title || data?.message || 'Update failed');
            }
            onSuccess(data); 
            onClose();   
            
        } catch (err) {
            console.error('💥 Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600">
                    <h2 className="text-xl font-semibold text-white">Update Employee</h2>
                    <button 
                        onClick={onClose}
                        className="text-white/80 hover:text-white text-3xl leading-none transition-colors"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm flex items-start gap-2">
                            <span className="text-lg">⚠️</span>
                            <span className="whitespace-pre-wrap">{error}</span>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            placeholder="Enter first name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            placeholder="Enter last name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            placeholder="employee@company.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            placeholder="+381 60 123 4567"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Department
                        </label>
                        <select
                            name="departmentId" 
                            value={formData.departmentId}  
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-white"
                            required
                        >
                            <option>{formData.departmentName}</option>
                            {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>  
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Assigned Projects
                        </label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <div className="max-h-48 overflow-y-auto bg-gray-50">
                                {entity.projects?.length > 0 ? (
                                    entity.projects.map(project => (
                                        <label 
                                            key={project.id} 
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 cursor-pointer transition-colors border-b last:border-b-0 border-gray-200"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.projectIds.includes(project.id)}
                                                onChange={() => toggleProject(project.id)}
                                                className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                                            />
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-gray-800">
                                                    {project.title}
                                                </span>
                                                {project.description && (
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {project.description}
                                                    </p>
                                                )}
                                            </div>
                                        </label>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                                        No projects available
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                                    style={{ 
                                        width: `${(formData.projectIds.length / Math.max(entity.projects?.length || 1, 1)) * 100}%` 
                                    }}
                                />
                            </div>
                            <span className="text-xs font-semibold text-indigo-600">
                                {formData.projectIds.length} / {entity.projects?.length || 0}
                            </span>
                        </div>
                    </div>
                </form>

                <div className="flex gap-3 p-6 border-t bg-gray-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/50"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}