import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  constructor(public appService: AppService, public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.appService.username = '';
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}
