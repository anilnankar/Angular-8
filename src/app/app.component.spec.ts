import { TestBed, async } from '@angular/core/testing';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],    
      imports: [
        RouterTestingModule,
        HttpClientTestingModule],
      providers: [
        AppService, 
        AuthService
      ], 
    }).compileComponents();
  }));
});

describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      return { fixture, app };
    }

    // it('should create the app', async(() => {
    //   const { app } = setup();
    //   expect(app).toBeTruthy();
    // }));

    // it(`should have as title 'softrams-racing'`, async(() => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   const app = fixture.debugElement.componentInstance;
    //   expect(app.title).toEqual('softrams-racing');
    // }));
});