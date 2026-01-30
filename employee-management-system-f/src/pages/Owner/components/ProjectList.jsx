import { useEffect, useState } from "react"

const ProjectList = ({ searchTerm }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        const getProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/Project");
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setProjects(data || []);
                
            } catch (err) {
                setError(err.message);
                console.error("Error fetching projects:", err);
            } finally {
                setLoading(false);
            }
        }

        getProjects();
    }, []);

    // Filtriranje projekata po search termu
    const filteredProjects = projects.filter(project =>
        project.title?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
        project.description?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-red-800 text-xl font-semibold mb-2">Greška pri učitavanju</h2>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                    <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Nema projekata</h3>
                    <p className="mt-2 text-gray-500">
                        {searchTerm ? 'Pokušajte sa drugačijom pretragom' : 'Trenutno nema projekata za prikaz'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div 
                            key={project.id} 
                            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                        >
                            {/* Project Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                                    {project.title}
                                </h3>
                                {project.startDate && (
                                    <div className="flex items-center text-blue-100 text-sm">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(project.startDate).toLocaleDateString('sr-RS')}
                                        {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('sr-RS')}`}
                                    </div>
                                )}
                            </div>

                            {/* Project Body */}
                            <div className="p-6">
                                {/* Description */}
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {project.description || 'Nema opisa'}
                                </p>

                                {/* Team Members */}
                                {project.employees && project.employees.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Tim ({project.employees.length})
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.employees.slice(0, 3).map((employee, idx) => (
                                                <span 
                                                    key={idx} 
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {employee.fullName}
                                                </span>
                                            ))}
                                            {project.employees.length > 3 && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                    +{project.employees.length - 3} još
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Status Badge */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                        project.endDate && new Date(project.endDate) < new Date()
                                            ? 'bg-gray-100 text-gray-800'
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {project.endDate && new Date(project.endDate) < new Date()
                                            ? '✓ Završen'
                                            : '● Aktivan'}
                                    </span>
                                    
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                                        Detalji →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProjectList;