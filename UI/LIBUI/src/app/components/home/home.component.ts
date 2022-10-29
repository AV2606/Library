import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { hasAny } from 'src/app/classes/Functions';
import { showToast } from 'src/app/classes/Toast';
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
  bookToShow: Book | undefined = undefined;
  popup: HTMLElement | null = null;

  constructor(private usersService: UsersService, private booksService: BooksService) {
    this.books = booksService.getAllAvailableBooks();
    this.filteredBooks = this.books;
    this.usersService.isUserLoggedIn().then(resolve => {
      if (resolve) { 
        console.log(resolve);
        
      }
      else
        this.usersService.goToLogin();
    })
  }

  ngOnInit(): void {
  }

  closeInfoPopUp(element: HTMLElement) {
    this.bookToShow = undefined;
    element.classList.add('hidden');
    this.popup = element;
  }

  showBookInfo(book: Book) {
    if (this.bookToShow)
      return;
    this.bookToShow = book;
    if (!this.popup)
      this.popup = document.getElementById('popup');
    this.popup?.classList.remove('hidden');
  }

  async borrowBook(bookId: number | undefined) {
    if (bookId == undefined)
      return;
    let email = (await this.usersService.getUser())?.email;
    if (email) {
      let ans = this.booksService.borrowBook(email, bookId);
      if (ans == 'succefull')
        showToast({
          text: 'book borrowed'
        });
    }
  }

  searchKeyPress(event: any, searchBar: HTMLInputElement) {
    if (event.key == 'Enter')
      this.filterBooks(searchBar.value);
  }

  filterBooks(str: string) {
    let filtered: Book[] = [];
    this.books.forEach(element => {
      if (element.author.indexOf(str) != -1 || element.title.indexOf(str) != -1)
        filtered.push(element);
    });
    this.filteredBooks = filtered;
  }

  resetBooks(searchBar: HTMLInputElement) {
    this.filteredBooks = this.books;
    searchBar.value = '';
  }

}
