using AutoMapper;
using BooksApi.DB;
using BooksApi.DTO;
using BooksApi.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _repo;
        private readonly IMapper mapper;
        private readonly BooksContext context;

        public BooksController(IBookRepository repo,IMapper mapper,BooksContext context)
        {
            this._repo = repo;
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllBooks()
        {
            return Ok(await _repo.GetAllBooksAsync());
        }
            
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            //var book = await _repo.GetBookByIdAsync(id);

            //if (book is null)
            //    return NotFound($"Cant find book number {id}");

            //return Ok(book);

            var book = context.Books.FindAsync(id);
            return Ok(mapper.Map<BookModel>(book));
        }

        [HttpPost]
        public async Task<IActionResult> AddNewBook([FromBody] BookModel bookModel)
        {
            var id = await _repo.AddBookAsync(bookModel);
            return CreatedAtAction(nameof(GetBookById), new { Id = id, Controller = "books" }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook([FromRoute] int id, [FromBody] BookModel bookModel)
        {
            await _repo.UpdateBookAsync(id, bookModel);
            return Ok();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchBook([FromRoute] int id, [FromBody] JsonPatchDocument bookModel)
        {
            await _repo.UpdateBookAsync(id, bookModel);
            return Ok();

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook([FromRoute] int id)
        {
            await _repo.DeleteBook(id);
            return Ok();
        }
    }
}
