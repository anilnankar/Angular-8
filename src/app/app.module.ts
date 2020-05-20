import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AuthGuard } from './auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';

// We may be missing a route...
const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate : [AuthGuard] 
  },
  {
    path: 'members-details',
    component: MemberDetailsComponent,
    canActivate : [AuthGuard] 
  },
  {
    path: 'members-edit',
    component: MemberEditComponent,
    canActivate : [AuthGuard] 
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

// Notice how both FormsModule and ReactiveFormsModule imported...choices, choices!
@NgModule({
  declarations: [AppComponent, BannerComponent, MemberDetailsComponent, MemberEditComponent, MembersComponent, LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, AuthService, AppService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
