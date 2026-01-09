using AutoMapper;
using employee_management_system_b.DTO.Create;
using employee_management_system_b.DTO.Response;
using employee_management_system_b.Mapping;
using employee_management_system_b.Models;
using employee_management_system_b.Repositories;
using employee_management_system_b.Repositories.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace employee_management_system_b.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public EmployeesController(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<EmployeeDTO>>> GetAll()
        {
            var employees = await unitOfWork.Employees.GetAll(e=> e.Company,
                                                              e=> e.Department, 
                                                              e=>e.Projects);

            var employeeList = employees.ToList();

            var employeeDtos = mapper.Map<List<EmployeeDTO>>(employeeList);
            return Ok(employeeDtos);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetEmployee(Guid id)
        {

            try
            {
                if (id == Guid.Empty)
                    return BadRequest("Invalid ID");

                var employee = await unitOfWork.Employees.GetById(id);

                if (employee == null)
                    return NotFound();

                return Ok(mapper.Map<EmployeeDTO>(employee));

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }


        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee(CreateEmployeeDTO employeeDTO)
        {
            if (employeeDTO == null)
            {
                return BadRequest("You cant send empty data");
            }
            var employee = mapper.Map<Employee>(employeeDTO);
            await unitOfWork.Employees.Add(employee);
            await unitOfWork.Commit();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, mapper.Map<EmployeeDTO>(employee));
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            if (id == Guid.Empty)
                return BadRequest("Invalid ID");

            var employee = await unitOfWork.Employees.GetById(id);

            if (employee == null)
                return NotFound();
            unitOfWork.Employees.Delete(employee);
            await unitOfWork.Commit();
            return NoContent();
        }

        public async Task<IActionResult> DeleteAllEmployees()
        {
            await unitOfWork.Employees.DeleteAll();
            await unitOfWork.Commit();
            return NoContent();
        }
        public async Task<IActionResult> UpdateEmployee(Guid id, CreateEmployeeDTO employeeDTO)
        {
            if (id == Guid.Empty || employeeDTO == null)
                return BadRequest("Invalid data");

            var existingEmployee = await unitOfWork.Employees.GetById(id);
            if (existingEmployee == null)
                return NotFound();

            mapper.Map(employeeDTO, existingEmployee);
            unitOfWork.Employees.Update(existingEmployee);
            await unitOfWork.Commit();
            return NoContent();
        }

    }
}

