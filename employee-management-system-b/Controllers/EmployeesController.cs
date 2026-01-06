using AutoMapper;
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
        public async Task<ActionResult<List<EmployeeDTO>>>GetAll()
        {


            var employees = await unitOfWork.Employees.GetAll();

            // Konvertuj u listu ako je IEnumerable
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

    }
}
