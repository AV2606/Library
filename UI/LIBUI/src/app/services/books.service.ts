import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  dev = true;

  private Books = [new Book(1, 'peter pen', 'local', 219),
  new Book(2, 'robin hood', 'local', 182),
  new Book(3, 'The Wave', 'martin', 221)]

  constructor() {
    if (this.dev)
      console.log('need to connect to server...');
  }

  getAllAvailableBooks(): Book[] {
    return this.Books;
  }
}

export class Book {

  id: number;
  title: string;
  author: string;
  pages: number;
  imgSrc: string = 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/book.png';

  constructor(id: number, title: string, author: string, pages: number, imgsrc: string = 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/book.png') {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}
