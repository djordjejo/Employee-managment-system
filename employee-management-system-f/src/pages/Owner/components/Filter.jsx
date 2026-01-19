const Filter = ({ label, onClick }) => (
  <button onClick={onClick} className="px-4 py-2 bg-white border rounded-md text-sm">
    {label}
  </button>
);

export default Filter;