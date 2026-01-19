using AutoMapper;
using employee_management_system_b.DTO.Create;
using employee_management_system_b.DTO.Response;
using employee_management_system_b.DTO.Update;
using employee_management_system_b.Models;
using employee_management_system_b.Repositories;
using employee_management_system_b.Repositories.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;

namespace Department_management_system_b.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public DepartmentController(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<DepartmentsDTO>>> GetAll()
        {
            var departments = await unitOfWork.Departments.GetAll(
               query => query.Include(e => e.Employees)
                );

            var departmentList = departments.ToList();

            var departmentDTO = mapper.Map<List<DepartmentsDTO>>(departmentList);
            return Ok(departmentDTO);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetDepartment(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                    return BadRequest("Invalid ID");

                var department = await unitOfWork.Departments.GetById(id);

                if (department == null)
                    return NotFound();

                return Ok(mapper.Map<DepartmentsDTO>(department));

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }


        }
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteDepartment(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                    return BadRequest("Invalid ID");

                var department = await unitOfWork.Departments.GetById(id);

                if (department == null)
                    return NotFound();

                unitOfWork.Departments.Delete(department);
                unitOfWork.Commit();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

        }
        [HttpPost]
        public async Task<IActionResult> CreateDepartment([FromBody] CreateDepartmentDTO departmentDTO)
        {
            try
            {
                if (departmentDTO == null)
                    return BadRequest("Department object is null");
               var department = mapper.Map<Department>(departmentDTO);

                await unitOfWork.Departments.Add(department);
                unitOfWork.Commit();

                var createdDepartment = mapper.Map<DepartmentsDTO>(department);
                return CreatedAtAction(nameof(GetDepartment), new { id = createdDepartment.Id }, createdDepartment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateDepartment(Guid id, [FromBody] UpdateDepartmentDTO departmentDTO)
        {
            try
            {
                if (id == Guid.Empty || departmentDTO == null)
                    return BadRequest("Invalid input");
                var existingDepartment = await unitOfWork.Departments.GetById(id);
                if (existingDepartment == null)
                    return NotFound();
                mapper.Map(departmentDTO, existingDepartment);
               
                unitOfWork.Departments.Update(existingDepartment);
                unitOfWork.Commit();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

        }
    }
}
