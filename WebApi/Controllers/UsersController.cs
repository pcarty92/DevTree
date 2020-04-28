using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Users;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private UserService _userService;
        private readonly ApplicationSettings _appSettings;

        public UsersController(UserService userService, IOptions<ApplicationSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        [Route("UserCount")]
        //GET: /api/Users/UserCount
        public IActionResult GetUserCount()
        {
            int result = _userService.NumOfUsers();

            return Ok(result);
        }

        [HttpPost]
        [Route("Register")]
        //POST: /api/Users/Register
        public IActionResult Register(RegisterModel model)
        {
            User user = new User
            {
                Name = model.Name,
                Username = model.Username
            };

            if (_userService.CreateUser(user, model.Password))
                return Ok();
            else
                return BadRequest("Username already exists");

        }

        [HttpPost]
        [Route("Authenticate")]
        //POST: /api/Users/Authenticate
        public IActionResult Authenticate(LogInModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest("Log in details are incorrect.");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_appSettings.JWT_Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                Token = tokenString
            });
        }
        
    }
}