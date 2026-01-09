using AutoMapper;
using employee_management_system_b.DTO.Create;
using employee_management_system_b.DTO.Response;
using employee_management_system_b.DTO.Update;
using employee_management_system_b.Models;
using employee_management_system_b.Repositories.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace employee_management_system_b.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper mapper;
        public DepartmentController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDepartments()
        {
            var departments = await _unitOfWork.Departments.GetAll();
            var departmentsDTO = mapper.Map<List<DepartmentsDTO>>(departments);
            return Ok(departmentsDTO);
        }
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetDepartmentById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var department = await _unitOfWork.Departments.GetById(id);

            if (department == null)
            {
                return NotFound();
            }
            var departmentDTO = mapper.Map<DepartmentsDTO>(department);
            return Ok(departmentDTO);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment([FromBody] CreateDepartmentDTO departmentDTO)
        {
            if (departmentDTO == null)
            {
                return BadRequest();
            }
            var departmentEntity = mapper.Map<Department>(departmentDTO);
            await _unitOfWork.Departments.Add(departmentEntity);
            await _unitOfWork.Commit();
            return CreatedAtAction(nameof(GetDepartmentById), new { id = departmentEntity.Id }, departmentEntity);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateDepartment(Guid id, [FromBody] UpdateDepartmentDTO departmentDTO)
        {
            if (departmentDTO == null)
            {
                return BadRequest();
            }
            var existingDepartment = await _unitOfWork.Departments.GetById(id);
            if (existingDepartment == null)
            {
                return NotFound("Non existing department");
            }
            var department = mapper.Map<Department>(departmentDTO);
            _unitOfWork.Departments.Update(department);
            await _unitOfWork.Commit();
            return NoContent();
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteDepartment(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }
            var existingDepartment = await _unitOfWork.Departments.GetById(id);
            if (existingDepartment == null)
            {
                return NotFound("Non existing department");
            }
            _unitOfWork.Departments.Delete(existingDepartment);
            await _unitOfWork.Commit();
            return NoContent();
        }
    }
}
