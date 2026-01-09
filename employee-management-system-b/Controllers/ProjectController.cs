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
    public class ProjectController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper mapper;
        public ProjectController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            var companies= await _unitOfWork.Projects.GetAll();
            var ProjectDTO = mapper.Map<List<ProjectDTO>>(companies);
            return Ok(ProjectDTO);
        }
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetProjectById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var Project = await _unitOfWork.Projects.GetById(id);

            if (Project == null)
            {
                return NotFound();
            }
            var ProjectDTO = mapper.Map<ProjectDTO>(Project);
            return Ok(ProjectDTO);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDTO projectDTO)
        {
            if (projectDTO == null)
            {
                return BadRequest();
            }
            var projectEntity = mapper.Map<Project>(projectDTO);
            await _unitOfWork.Projects.Add(projectEntity);
            await _unitOfWork.Commit();
            return CreatedAtAction(nameof(GetProjectById), new { id = projectEntity.Id }, projectEntity);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateProject(Guid id, [FromBody] UpdateProjectDTO projectDTO)
        {
            if (projectDTO == null)
            {
                return BadRequest();
            }
            var existingProject = await _unitOfWork.Projects.GetById(id);
            if (existingProject == null)
            {
                return NotFound("Non existing Project");
            }
            var project = mapper.Map<Project>(projectDTO);
            _unitOfWork.Projects.Update(project);
            await _unitOfWork.Commit();
            return NoContent();
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteProject(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }
            var existingProject = await _unitOfWork.Projects.GetById(id);
            if (existingProject == null)
            {
                return NotFound("Non existing Project");
            }
            _unitOfWork.Projects.Delete(existingProject);
            await _unitOfWork.Commit();
            return NoContent();
        }
    }
}
