import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  dev = true;

  private Books = [new Book(1, 'peter pen', 'local', 219, 'none'),
  new Book(2, 'robin hood', 'local', 182, 'none'),
  new Book(3, 'The Wave', 'martin', 221, 'none'),
  new Book(4, 'spongebob squarepants', 'patchi the priate', 78, 'none')]

  constructor() {
    if (this.dev)
      console.log('need to connect to server...');
  }

  getAllAvailableBooks(): Book[] {
    return this.Books;
  }

  borrowBook(borrowerEmail: string, bookId: number): 'succefull' | 'book taken' | 'cant find book' | 'unknown' {
    let r: 'succefull' | 'book taken' | 'cant find book' | 'unknown' = 'unknown';
    Borrows.borrows.forEach(element => {
      if (r == 'book taken')
        if (element.bookId == bookId)
          r = 'book taken';
    });
    let found = false;
    this.Books.forEach(elemnt => {
      if (elemnt.id == bookId)
        found = true;
    });
    if (found == false)
      r = 'cant find book';
    Borrows.borrows.push({ borrowerEmail, bookId });
    Borrows.borrows.forEach(element => {
      if (element.bookId == bookId)
        r = 'succefull';
    });
    return r;
  }
}

export class Book {

  id: number;
  title: string;
  author: string;
  pages: number;
  summary: string;
  imgSrc: string = 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/book.png';

  constructor(id: number, title: string, author: string, pages: number, summary: string, imgsrc: string = 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/book.png') {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.summary = summary;
  }
}
export class Borrows {
  static borrows: { borrowerEmail: string, bookId: number }[] = [];
}
