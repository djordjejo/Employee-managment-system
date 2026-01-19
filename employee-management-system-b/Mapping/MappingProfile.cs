using AutoMapper;
using employee_management_system_b.DTO.Basics;
using employee_management_system_b.DTO.Create;
using employee_management_system_b.DTO.Dropdown;
using employee_management_system_b.DTO.Response;
using employee_management_system_b.DTO.Update;
using employee_management_system_b.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // ============================================
        // Employee mappings
        // ============================================

        CreateMap<Employee, EmployeeDTO>()
            .ForMember(dest => dest.FullName,
                opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
            .ForMember(dest => dest.CompanyName,
                opt => opt.MapFrom(src => src.Company != null ? src.Company.Name : null))
            .ForMember(dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.Department != null ? src.Department.Name : null))
            .ForMember(dest => dest.Projects,
                opt => opt.MapFrom(src => src.Projects
                    .Where(ep => ep.Project != null)
                    .Select(ep => ep.Project)));  // ✅ Mapira EmployeeProject → Project

        CreateMap<Employee, EmployeeBasicDTO>()
            .ForMember(dest => dest.FullName,
                opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"));

        CreateMap<Employee, EmployeeDropdownDTO>()
            .ForMember(dest => dest.FullName,
                opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"));

        CreateMap<CreateEmployeeDTO, Employee>()
            .ForMember(dest => dest.Projects, opt => opt.Ignore());

        // ============================================
        // Project mappings
        // ============================================

        CreateMap<Project, ProjectsDTO>()
            .ForMember(dest => dest.CompanyName,
                opt => opt.MapFrom(src => src.Company != null ? src.Company.Name : null))
            .ForMember(dest => dest.Employees,
                opt => opt.MapFrom(src => src.Employees
                    .Where(ep => ep.Employee != null)
                    .Select(ep => ep.Employee)));  // ✅ Mapira EmployeeProject → Employee

        CreateMap<Project, ProjectBasicDTO>();
        CreateMap<Project, ProjectDropdownDTO>();
        CreateMap<Project, UpdateProjectDTO>();
        CreateMap<Project, CreateProjectDTO>();
        CreateMap<Project, ProjectsDTO>();
        CreateMap<CreateProjectDTO, Project>()
            .ForMember(dest => dest.Employees, opt => opt.Ignore());

        // ============================================
        // Company & Department mappings
        // ============================================

        CreateMap<Company, CompanyDropdownDTO>();
        CreateMap<Company, CompanyDTO>().ReverseMap();
        CreateMap<Company, CreateCompanyDTO>().ReverseMap();
        CreateMap<Company, UpdateCompanyDTO>().ReverseMap();
        
        CreateMap<Department, DepartmentDropdownDTO>();
        CreateMap<Department, DepartmentsDTO>().ReverseMap();
        CreateMap<Department, UpdateCompanyDTO>().ReverseMap();
        CreateMap<Department, CreateDepartmentDTO>().ReverseMap();
    }
}