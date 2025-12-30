const SidebarItem = ({ label, active }) => (
  <div
    className={`px-3 py-2 rounded-md cursor-pointer ${
      active ? "bg-white/20" : "hover:bg-white/10"
    }`}
  >
    {label}
  </div>
);

export default SidebarItem;