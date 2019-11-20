using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BelaVista.Entity.Identity;
using BelaVista.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BelaVista.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IBelaVistaRepository _repositoryContext;

        public UserController(IConfiguration config, UserManager<User> userManager, SignInManager<User> signInManager, IBelaVistaRepository repositoryContext)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _config = config;
            _repositoryContext = repositoryContext;
        }

        [HttpGet("getUser")]
        public async Task<IActionResult> GetUser(User user)
        {
            return Ok(user);
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(User user)
        {
            try
            {
                var result = await _userManager.CreateAsync(user, user.Password);
                if(result.Succeeded)
                {
                    // cria role
                    var tmpUser = await _userManager.FindByEmailAsync(user.Email);
                    if(tmpUser != null){        
                        var userRole = new UserRole();
                        userRole.UserId = tmpUser.Id;
                        // fixo 2 usuário comum
                        userRole.RoleId = 2;
                        _repositoryContext.Add(userRole);
                    }
                    if (await _repositoryContext.SaveChanges())
                    {
                    }
                    
                    return Created("GetUser", result);
                }else{
                    return BadRequest(result.Errors);
                }
            }
            catch(System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(User user)
        {
            try
            {
                var findUser = await _userManager.FindByEmailAsync(user.Email);
                if(findUser != null){
                    var result = await _signInManager.CheckPasswordSignInAsync(findUser, user.Password, false);
                    if(result.Succeeded)
                    {
                        //realiza comparação do e-mail informado na tela
                        var appedUser = await _userManager.Users.
                        FirstOrDefaultAsync(u => u.Email.Equals(user.Email));
                        if(appedUser != null){
                            var role = await _userManager.GetRolesAsync(appedUser);
                            return Ok(new {
                                token = GenerateJWToken(appedUser).Result,
                                userLogin = appedUser,
                                role = role
                            });
                        }
                    }
                }
                return Unauthorized();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Usuário não encontrado. {ex.Message}");
            }
        }

        private async Task<string> GenerateJWToken(User user)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);
            if(roles != null && roles.Count > 0)
            {
                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }
            }

            var key = new SymmetricSecurityKey(Encoding.ASCII
                    .GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}