using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private JobService _jobService;

        public JobsController(JobService jobService)
        {
            _jobService = jobService;
        }

        [HttpPost]
        [Route("PostJob")]
        //POST: /api/Jobs/PostJob
        public IActionResult PostJob(JobModel jobModel)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            if (_jobService.CreateJob(jobModel, userId))
                return Ok();
            else
                return BadRequest("Job fields are required");
        }

        [HttpGet]
        [Route("GetUserJobs")]
        //GET: /api/Jobs/GetUserJobs
        public IActionResult GetUserJobs()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            var jobs = _jobService.GetUserJobs(userId);

            return Ok(jobs);
        }

        [HttpGet]
        [Route("GetNonUserJobs")]
        //GET: /api/Jobs/GetNonUserJobs
        public IActionResult GetNonUserJobs()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            var jobs = _jobService.GetNonUserJobs(userId);

            return Ok(jobs);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            if (_jobService.Delete(id, userId))
                return Ok();
            else
                return Unauthorized("Cannot delete job");
        }

    }
}