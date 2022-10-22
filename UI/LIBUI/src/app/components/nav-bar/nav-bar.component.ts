import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  lastActiveEl: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  btnClick(element: any) {
  }
}
