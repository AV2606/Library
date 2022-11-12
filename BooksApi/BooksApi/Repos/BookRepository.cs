using BooksApi.DB;
using BooksApi.DB.Models;
using BooksApi.DTO;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksApi.Repos
{
    public class BookRepository : IBookRepository
    {
        private readonly BooksContext _context;

        public BookRepository(BooksContext context)
        {
            this._context = context;
        }

        public async Task<List<BookModel>> GetAllBooksAsync()
        {
            var records = await _context.Books.Select(x =>
            new BookModel()
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description
            }).ToListAsync();
            return records;
        }
        public async Task<BookModel> GetBookByIdAsync(int id)
        {
            var record = await _context.Books.Where(x => x.Id == id).Select(x =>
                 new BookModel()
                 {
                     Id = x.Id,
                     Title = x.Title,
                     Description = x.Description
                 }).FirstOrDefaultAsync();
            return record;
        }
        public async Task<int> AddBookAsync(BookModel bookModel)
        {
            var book = new Book
            {
                Title = bookModel.Title,
                Description = bookModel.Description
            };
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return book.Id;
        }
        public async Task UpdateBookAsync(int bookId,BookModel modifiedModel)
        {
            //var book = await _context.Books.FindAsync(bookId);

            //if(book is not null)
            //{
            //    book.Title = modifiedModel.Title;
            //    book.Description = modifiedModel.Description;
            //    await _context.SaveChangesAsync();
            //    return;
            //}
            //return;

            var book = new Book()
            {
                Id = bookId,
                Title = modifiedModel.Title,
                Description = modifiedModel.Description
            };

            _context.Books.Update(book);
        }
        public async Task UpdateBookAsync(int bookId, JsonPatchDocument bookModel)
        {
            var book = await _context.Books.FindAsync(bookId);

            if (book is not null)
            {
                bookModel.ApplyTo(book);
                await _context.SaveChangesAsync();
            }
        }
        public async Task DeleteBook(int bookId)
        {
            var book = new Book { Id = bookId };
            _context.Remove(book);
            await _context.SaveChangesAsync();
        }
    }
}
