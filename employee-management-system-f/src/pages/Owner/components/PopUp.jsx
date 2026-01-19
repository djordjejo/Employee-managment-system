export default function PopUp({entity, title, onClose}) {
    // Normalizuj entity da uvek bude niz
    const items = Array.isArray(entity) ? entity : [entity];
    const entityType = title.split(' ')[0];

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
               
                {items.map((item) => {
                    if (entityType === "Department") {
                        return (
                            <div key={item.id}>
                                <p><span className="font-semibold">Name:</span> {item.name}</p>
                                <p><span className="font-semibold">Description:</span> {item.description}</p>
                            </div>
                        );
                    }
                    
                    if (entityType === "Employee") {
                        return (
                            <div key={item.id}>
                                <p><span className="font-semibold">First Name:</span> {item.firstName}</p>
                                <p><span className="font-semibold">Last Name:</span> {item.lastName}</p>
                                <p><span className="font-semibold">Email:</span> {item.email}</p>
                                <p><span className="font-semibold">Phone Number:</span> {item.phoneNumber}</p>
                                <p><span className="font-semibold">Department:</span> {item.departmentName}</p>
                                
                                {item.projects && item.projects.length > 0 && (
                                    <div className="mt-4">
                                        <p className="font-semibold">Projects:</p>
                                        <ul className="list-disc ml-5">
                                            {item.projects.map((project) => (
                                                <li key={project.id}>{project.title}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    }
                    
                    return null;
                })}
                
                <button 
                    onClick={onClose}
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
}