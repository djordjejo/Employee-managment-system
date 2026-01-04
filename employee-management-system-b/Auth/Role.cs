namespace employee_management_system_b.Auth
{
    public static class Role
    {
        public const string Admin = "Admin";
        public const string Manager = "Manager";
        public const string Employee = "Employee";

        public static readonly string[] AllRoles = new[] {
            "Admin",
            "Manager",
            "Employee"
        };
        
          
    }
}
