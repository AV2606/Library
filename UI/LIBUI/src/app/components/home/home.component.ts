import { Component, OnInit } from '@angular/core';
import { hasAny } from 'src/app/classes/Functions';
import { Book, BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  geners = ['romantic', 'horror'];
  selectedGeners = [];
  books: Book[];
  filteredBooks: Book[];

  constructor(private usersService: UsersService, private booksService: BooksService) {
    this.books = booksService.getAllAvailableBooks();
    this.filteredBooks = this.books;
  }

  ngOnInit(): void {
  }

  filterBooks(str: string) {
    let filtered: Book[] = [];
    this.books.forEach(element => {
      if (element.author.indexOf(str) != -1 || element.title.indexOf(str) != -1)
        filtered.push(element);
    });
    this.filteredBooks = filtered;
  }

  resetBooks() {
    this.filteredBooks = this.books
  }

}
