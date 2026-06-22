export default function Button({ type, children }) {
    return (
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
         {children}
        </button>
    );
}