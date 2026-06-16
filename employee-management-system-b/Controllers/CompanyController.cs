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

namespace Company_management_system_b.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public CompanyController(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<CompanyDTO>>> GetAll()
        {
            var companies = await unitOfWork.Companies.GetAll(
               query => query.Include(e => e.Employees).Include(e => e.Departments)
                             .Include(e => e.Projects)
                );

            var companyList = companies.ToList();

            var companyDTO = mapper.Map<List<CompanyDTO>>(companyList);
            return Ok(companyDTO);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCompany(Guid id)
        {

            try
            {
                if (id == Guid.Empty)
                    return BadRequest("Invalid ID");

                var company = await unitOfWork.Companies.GetById(id);

                if (company == null)
                    return NotFound();

                return Ok(mapper.Map<CompanyDTO>(company));

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }


        }
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteCompany(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                    return BadRequest("Invalid ID");

                var company = await unitOfWork.Companies.GetById(id);

                if (company == null)
                    return NotFound();

                unitOfWork.Companies.Delete(company);
                await unitOfWork.Commit();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

        }
        [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] CreateCompanyDTO companyDTO)
        {
            try
            {
                if (companyDTO == null)
                    return BadRequest("Company object is null");
               var company = mapper.Map<Company>(companyDTO);

                await unitOfWork.Companies.Add(company);
                await unitOfWork.Commit();

                var createdCompany = mapper.Map<CompanyDTO>(companyDTO);
                return CreatedAtAction(nameof(GetCompany), new { id = createdCompany.Id }, createdCompany);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCompany(Guid id, [FromBody] UpdateCompanyDTO companyDTO)
        {
            try
            {
                if (id == Guid.Empty || companyDTO == null)
                    return BadRequest("Invalid input");
                var existingCompany = await unitOfWork.Companies.GetById(id);
                if (existingCompany == null)
                    return NotFound();
                mapper.Map(companyDTO, existingCompany);
               
                unitOfWork.Companies.Update(existingCompany);
                await unitOfWork.Commit();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

        }
    }
}
