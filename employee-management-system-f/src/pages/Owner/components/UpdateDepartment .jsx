import { useState } from "react"

export default function UpdateDepartment({ entity, onSuccess, onClose }) {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: entity.id || '',
        name: entity.name || '',
        description: entity.description || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const url = `https://localhost:7183/api/Department/UpdateDepartment/${formData.id}`;
            console.log('🌐 Calling:', url);
            console.log('📤 Data:', { name: formData.name, description: formData.description });

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description
                })
            });

            console.log('📡 Response status:', response.status);

            // ✅ Handle 204 No Content
            if (response.status === 204) {
                console.log('✅ Update successful!');
                onSuccess();
                onClose();
                return;
            }

            // ✅ For other responses, parse JSON safely
            const text = await response.text();
            console.log('📄 Response text:', text);

            let data;
            try {
                data = text ? JSON.parse(text) : {};
            } catch (parseError) {
                console.error('⚠️ JSON parse error:', parseError);
                data = { message: text || 'Unknown error' };
            }

            if (!response.ok) {
                console.error('❌ Error response:', data);

                if (data?.errors) {
                    const errorMessages = Object.entries(data.errors)
                        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');
                    throw new Error(errorMessages);
                }

                throw new Error(data?.title || data?.message || data?.error || 'Update failed');
            }
            
            onSuccess(data);
            onClose();

        } catch (err) {
            console.error('💥 Error:', err);
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600">
                    <h2 className="text-xl font-semibold text-white">Update Department</h2>
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
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            placeholder="Enter department name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            placeholder="Enter description (optional)"
                            rows="4"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/50 disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}