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

namespace Project_management_system_b.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public ProjectController(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<ProjectsDTO>>> GetAll()
        {
            var projects = await unitOfWork.Projects.GetAll(
               query => query.Include(e => e.Employees).ThenInclude(ep => ep.Employee)
                );

            var projectList = projects.ToList();

            var projectDTO = mapper.Map<List<ProjectsDTO>>(projectList);
            return Ok(projectDTO);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetProject(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                    return BadRequest("Invalid ID");

                var Project = await unitOfWork.Projects.GetById(id);

                if (Project == null)
                    return NotFound();

                return Ok(mapper.Map<ProjectsDTO>(Project));

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }


        }
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteProject(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                    return BadRequest("Invalid ID");

                var Project = await unitOfWork.Projects.GetById(id);

                if (Project == null)
                    return NotFound();

                unitOfWork.Projects.Delete(Project);
                await unitOfWork.Commit();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

        }
        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDTO projectDTO)
        {
            try
            {
                if (projectDTO == null)
                    return BadRequest("Project object is null");
               var Project = mapper.Map<Project>(projectDTO);

                await unitOfWork.Projects.Add(Project);
                await unitOfWork.Commit();

                var createdProject = mapper.Map<ProjectsDTO>(Project);
                return CreatedAtAction(nameof(GetProject), new { id = createdProject.Id }, createdProject);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateProject(Guid id, [FromBody] UpdateProjectDTO projectDTO)
        {
            try
            {
                if (id == Guid.Empty || projectDTO == null)
                    return BadRequest("Invalid input");
                var existingProject = await unitOfWork.Projects.GetById(id);
                if (existingProject == null)
                    return NotFound();
                mapper.Map(projectDTO, existingProject);
               
                unitOfWork.Projects.Update(existingProject);
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
