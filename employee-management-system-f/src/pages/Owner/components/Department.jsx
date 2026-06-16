const Department = ({ label, color }) => (
  <div className="flex items-center gap-2 text-sm mb-2">
    <span className={`w-2 h-2 rounded-full ${color}`} />
    {label}
  </div>
);
export default Department;