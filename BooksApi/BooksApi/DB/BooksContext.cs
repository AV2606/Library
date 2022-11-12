using BooksApi.DB.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksApi.DB
{
    public class BooksContext:IdentityDbContext<ApplicationUser>
    {

        public BooksContext(DbContextOptions<BooksContext> options):base(options)
        {
            Books.Add(new Book() { Title = "titly", Description = "description" });
            this.Database.EnsureCreated();
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Server=.;Database=BookStoreApi;Intergrated Security=True");

        //    base.OnConfiguring(optionsBuilder);
        //}


        public DbSet<Book> Books { get; set; }
    }
}
