export default function Input({ type, placeholder, value, onChange }) {
    
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}