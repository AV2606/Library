using AutoMapper;
using BooksApi.DB.Models;
using BooksApi.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksApi
{
    public class ApplicationMapper:Profile
    {
        public ApplicationMapper()
        {
            this.CreateMap<Book, BookModel>().ReverseMap();
        }

    }
}
