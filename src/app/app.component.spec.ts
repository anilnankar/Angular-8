import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';

import { AppService } from './app.service';
import { AuthService } from './auth.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BannerComponent
      ],    
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [], 
    }).compileComponents();
  }));

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