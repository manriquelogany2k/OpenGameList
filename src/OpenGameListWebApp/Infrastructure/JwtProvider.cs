using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using OpenGameListWebApp.Data;
using OpenGameListWebApp.Data.Users;

namespace OpenGameListWebApp.Infrastructure
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class JwtProvider
    {
        private readonly RequestDelegate _next;
        // JWT-related members
        private TimeSpan _tokenExpiration;
        private readonly SigningCredentials _signingCredentials;

        // EF and Identity members, available through DI
        private ApplicationDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;

        private static readonly string PrivateKey = "private_key_1234567890";
        public static readonly SymmetricSecurityKey SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(PrivateKey));
        public static readonly string Issuer = "OpenGameListWebApp";
        public static string TokenEndPoint = "/api/connect/token";



        public JwtProvider(RequestDelegate next, ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _next = next;

            // Instantiate JWT-related members
            _tokenExpiration = TimeSpan.FromMinutes(10);
            _signingCredentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);

            // Instantiate through Dependency Injection
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
        }



        public Task Invoke(HttpContext httpContext)
        {
            // Check if the request path matches our TokenEndPoint 
            if (!httpContext.Request.Path.Equals(TokenEndPoint, StringComparison.Ordinal)) return _next(httpContext);

            // Check if the current request is a valid POST with the appropriate content type (application/x-www-form-urlencoded) 
            if (httpContext.Request.Method.Equals("POST") && httpContext.Request.HasFormContentType)
            {
                // OK: generate token and send it via a json-formatted string 
                return CreateToken(httpContext);
            }
            else
            {
                // Not OK: output a 400 - Bad request HTTP error. 
                httpContext.Response.StatusCode = 400;
                return httpContext.Response.WriteAsync("Bad request.");
            }
        }



        private async Task CreateToken(HttpContext httpContext)
        {
            try
            {
                // retrieve the relevant FORM data
                string username = httpContext.Request.Form["username"];
                string password = httpContext.Request.Form["password"];

                // check if there's an user with the given username
                var user = await _userManager.FindByNameAsync(username);
                // fallback to support e-mail address instead of username
                if (user == null && username.Contains("@")) user = await _userManager.FindByEmailAsync(username);

                var success = user != null && await _userManager.CheckPasswordAsync(user, password);
                if (success)
                {
                    var now = DateTime.UtcNow;

                    // add the registered claims for JWT (RFC7519).
                    // For more info, see https://tools.ietf.org/html/rfc7519#section-4.1
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Iss, Issuer),
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
                        // add additional claims here
                    };

                    // Create the JWT and write it to a string
                    var token = new JwtSecurityToken(
                    claims: claims,
                    notBefore: now,
                    expires: now.Add(_tokenExpiration),
                    signingCredentials: _signingCredentials);
                    var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

                    // build the json response
                    var jwt = new
                    {
                        access_token = encodedToken,
                        expiration = (int)_tokenExpiration.TotalSeconds
                    };

                    // return token
                    httpContext.Response.ContentType = "application/json";
                    await httpContext.Response.WriteAsync(JsonConvert.SerializeObject(jwt));
                    return;
                }
            }
            catch (Exception ex)
            {
                // TODO: handle errors
                throw ex;
            }

            httpContext.Response.StatusCode = 400;
            await httpContext.Response.WriteAsync("Invalid username or password.");
        }



    }





    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class JwtProviderExtensions
    {
        public static IApplicationBuilder UseJwtProvider(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtProvider>();
        }
    }






}
