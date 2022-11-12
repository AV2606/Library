import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showAddBookPage=false;


  showTitleError=false;
  showAuthorError=false;
  showPageAmountError=false;
  showSummaryError=false;
  

  constructor() { }

  ngOnInit(): void {
  }

  showAddBook(){
    this.showAddBookPage=true;
  }

  addBook(){
    console.log('not implemented');
    
  }

}
