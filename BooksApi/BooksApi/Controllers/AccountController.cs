using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BooksApi.Repos;
using BooksApi.DB.Models;
using BooksApi.DTO;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
//using Microsoft.IdentityModel.JsonWebTokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BooksApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountsRepository accountRepo;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IConfiguration configuration;

        public AccountController(IAccountsRepository accountRepo,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration)
        {
            this.accountRepo = accountRepo;
            this.signInManager = signInManager;
            this.configuration = configuration;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpModel signup)
        {
            var result = await accountRepo.SignUpAsync(signup);

            if (result.Succeeded)
                return Ok("Sign up succeded.");
            else
                return Unauthorized();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]SignInModel signInModel)
        {
            var result = await accountRepo.LoginAsync(signInModel);
            if(string.IsNullOrEmpty(result))
            {
                return Unauthorized();
            }
            return Ok(result);
        }

        [HttpGet("isAdmin")]
        public async Task<IActionResult> isUserAdmin([FromBody] string token)
        {
            //this.accountRepo
            return Ok("might be");
        }
    }
}
