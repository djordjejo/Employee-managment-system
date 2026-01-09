using AutoMapper;
using employee_management_system_b.DTO.Basics;
using employee_management_system_b.DTO.Create;
using employee_management_system_b.DTO.Dropdown;
using employee_management_system_b.DTO.Response;
using employee_management_system_b.Models;

namespace employee_management_system_b.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDTO>()
             .ForMember(dest => dest.CompanyName,
                 opt => opt.MapFrom(src => src.Company.Name))
             .ForMember(dest => dest.DepartmentName,
                 opt => opt.MapFrom(src => src.Department.Name))
             .ForMember(dest => dest.Projects,
                 opt => opt.MapFrom(src => src.Projects.Select(ep => ep.Project)));

            // Employee → EmployeeBasicDto
            CreateMap<Employee, EmployeeBasicDTO>();

            // Employee → EmployeeDropdownDto
            CreateMap<Employee, EmployeeDropdownDTO>();

            // CreateEmployeeDto → Employee (NE mapiraš Projects ovde)
            CreateMap<CreateEmployeeDTO, Employee>()
                .ForMember(dest => dest.Projects, opt => opt.Ignore());

            // ============================================
            // Project mappings
            // ============================================

            // Project → ProjectDto
            CreateMap<Project, ProjectDTO>()
                .ForMember(dest => dest.CompanyName,
                    opt => opt.MapFrom(src => src.Company.Name))
                .ForMember(dest => dest.Employees,
                    opt => opt.MapFrom(src => src.Employees.Select(ep => ep.Employee)));

            // Project → ProjectBasicDto
            CreateMap<Project, ProjectBasicDTO>();

            // Project → ProjectDropdownDto
            CreateMap<Project, ProjectDropdownDTO>();

            // CreateProjectDto → Project
            CreateMap<CreateProjectDTO, Project>()
                .ForMember(dest => dest.Employees, opt => opt.Ignore());

            // ============================================
            // Company & Department mappings
            // ============================================

            CreateMap<Company, CompanyDropdownDTO>();
            CreateMap<CompanyDTO, Company>().ReverseMap();
            CreateMap<Department, DepartmentDropdownDTO>();
            CreateMap<Department, DepartmentsDTO>().ReverseMap();
        }
    }
}
