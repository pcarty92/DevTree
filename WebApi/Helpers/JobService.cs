using System.Collections.Generic;
using System.Linq;
using WebApi.Data;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Helpers
{
    public class JobService
    {
        private DataContext _context;

        public JobService(DataContext context)
        {
            _context = context;
        }

        public bool CreateJob(JobModel model, string userId)
        {
            if (string.IsNullOrEmpty(model.JobName) || string.IsNullOrEmpty(model.JobDescription)
                || model.Price <= 0)
            {
                return false;
            }

            Job job = new Job
            {
                JobName = model.JobName,
                JobDescription = model.JobDescription,
                Price = model.Price,
                UserId = int.Parse(userId),
                Username = _context.Users.Find(int.Parse(userId)).Username
            };

            _context.Jobs.Add(job);
            _context.SaveChanges();

            return true;
        }

        public IEnumerable<Job> GetUserJobs(string userId)
        {
            var jobs = _context.Jobs
                .Where(j => j.UserId == int.Parse(userId));

            return jobs;
        }

        public IEnumerable<Job> GetNonUserJobs(string userId)
        {
            var jobs = _context.Jobs
                .Where(j => j.UserId != int.Parse(userId));

            return jobs;
        }

        public bool Delete(int id, string userId)
        {
            var job = _context.Jobs.Find(id);

            if (job.UserId != int.Parse(userId))
                return false;

            if (job == null)
            {
                return false;
            }
            else
            {
                _context.Jobs.Remove(job);
                _context.SaveChanges();

                return true;
            }
        }
    }
}
