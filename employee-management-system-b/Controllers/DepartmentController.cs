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
            var departments = await unitOfWork.Departments.GetAll();
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
                await unitOfWork.Commit();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

        }
        [HttpPost("CreateDepartment")]
        public async Task<IActionResult> CreateDepartment( CreateDepartmentDTO departmentDTO)
        {
            try
            {
                if (departmentDTO == null)
                    return BadRequest("Department object is null");
               var department = mapper.Map<Department>(departmentDTO);

                await unitOfWork.Departments.Add(department);
                await  unitOfWork.Commit();

                var createdDepartment = mapper.Map<DepartmentsDTO>(department);
                return CreatedAtAction(nameof(GetDepartment), new { id = createdDepartment.Id }, createdDepartment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        
            [HttpPut("UpdateDepartment/{id:guid}")]
            public async Task<IActionResult> UpdateDepartment(Guid id, [FromBody] UpdateDepartmentDTO departmentDTO)
            {
                try
                {

                    if (id == Guid.Empty || departmentDTO == null)
                        return BadRequest("Invalid input");

                    var department = await unitOfWork.Departments.GetById(id);

                    if (department == null)
                    {
                        Console.WriteLine($"❌ Department not found!");
                        return NotFound();
                    }
                    unitOfWork.Departments.Update(department);
                    await unitOfWork.Commit();


                    return NoContent();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Error: {ex.Message}");
                    Console.WriteLine($"❌ Inner: {ex.InnerException?.Message}");
                    Console.WriteLine($"❌ Stack: {ex.StackTrace}");
                    return StatusCode(500, new { error = ex.InnerException?.Message ?? ex.Message });
                }
            }
        }
    }

