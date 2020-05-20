import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Application title
  title = 'softrams-racing';

  constructor(
    private appService: AppService, 
    private router:Router, 
    private authService:AuthService) {
  }

  ngOnInit(): void {}
}
