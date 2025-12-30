const EmployeeRow = ({ name, email, department, deptColor, role }) => (
  <tr className="border-b last:border-none">
    <td className="p-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gray-300" />
      <span>{name}</span>
    </td>
    <td>1828267</td>
    <td>{email}</td>
    <td>
      <span className={`px-3 py-1 rounded-full text-xs ${deptColor}`}>
        {department}
      </span>
    </td>
    <td>{role}</td>
    <td className="p-4">
      <button className="text-indigo-600 text-sm">See Details</button>
    </td>
  </tr>
);
export default EmployeeRow;