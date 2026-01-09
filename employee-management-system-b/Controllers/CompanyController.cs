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
    public class CompanyController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper mapper;
        public CompanyController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCompanys()
        {
            var companies= await _unitOfWork.Companies.GetAll();
            var companyDTO = mapper.Map<List<CompanyDTO>>(companies);
            return Ok(companyDTO);
        }
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCompanyById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var company = await _unitOfWork.Companies.GetById(id);

            if (company == null)
            {
                return NotFound();
            }
            var companyDTO = mapper.Map<CompanyDTO>(company);
            return Ok(companyDTO);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] CreateCompanyDTO companyDTO)
        {
            if (companyDTO == null)
            {
                return BadRequest();
            }
            var companyEntity = mapper.Map<Company>(companyDTO);
            await _unitOfWork.Companies.Add(companyEntity);
            await _unitOfWork.Commit();
            return CreatedAtAction(nameof(GetCompanyById), new { id = companyEntity.Id }, companyEntity);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCompany(Guid id, [FromBody] UpdateCompanyDTO CompanyDTO)
        {
            if (CompanyDTO == null)
            {
                return BadRequest();
            }
            var existingCompany = await _unitOfWork.Companies.GetById(id);
            if (existingCompany == null)
            {
                return NotFound("Non existing Company");
            }
            var Company = mapper.Map<Company>(CompanyDTO);
            _unitOfWork.Companies.Update(Company);
            await _unitOfWork.Commit();
            return NoContent();
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteCompany(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }
            var existingCompany = await _unitOfWork.Companies.GetById(id);
            if (existingCompany == null)
            {
                return NotFound("Non existing Company");
            }
            _unitOfWork.Companies.Delete(existingCompany);
            await _unitOfWork.Commit();
            return NoContent();
        }
    }
}
