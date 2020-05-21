import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { AuthGuard } from './auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';

// Application routes
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

@NgModule({
  declarations: [
    AppComponent, 
    BannerComponent, 
    MemberDetailsComponent, 
    MemberEditComponent, 
    MembersComponent, 
    LoginComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    AuthGuard, 
    AuthService, 
    AppService, 
    HttpClient,
    ConfirmationDialogService
  ],
  bootstrap: [
    AppComponent    
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class AppModule {}
