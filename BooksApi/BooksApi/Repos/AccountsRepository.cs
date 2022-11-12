using BooksApi.DB.Models;
using BooksApi.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BooksApi.Repos
{
    public class AccountsRepository:IAccountsRepository
    {
        private readonly UserManager<ApplicationUser> manager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IConfiguration configuration;

        public AccountsRepository(UserManager<ApplicationUser> manager,

            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration)
        {
            this.manager = manager;
            this.signInManager = signInManager;
            this.configuration = configuration;

        }

        public async Task<IdentityResult> SignUpAsync(SignUpModel signUp)
        {
            var user = new ApplicationUser() { 
                FirstName = signUp.FirstName,
                LastName=signUp.LastName,
                Email=signUp.Email,
                UserName=signUp.Email
                
            };

            return await manager.CreateAsync(user, signUp.Password);
        }
        public async Task<string> LoginAsync(SignInModel signIn)
        {
            var result = await signInManager.PasswordSignInAsync(signIn.Email, signIn.Password, false, false);
            if (!result.Succeeded)
            {
                return null;
            }
            var myClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,signIn.Email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
            };
            var authSignKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssue"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddDays(1),
                claims: myClaims,
                signingCredentials: new SigningCredentials(authSignKey, SecurityAlgorithms.HmacSha256Signature)
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
    public interface IAccountsRepository 
    {
        Task<IdentityResult> SignUpAsync(SignUpModel signUp);
        Task<string> LoginAsync(SignInModel signIn);
    }
}
