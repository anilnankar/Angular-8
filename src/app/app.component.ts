import { Component, OnInit } from '@angular/core';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Application title
  public title = 'softrams-racing';
  public spinkit = Spinkit;

  constructor() {
  }

  ngOnInit(): void {}
}
