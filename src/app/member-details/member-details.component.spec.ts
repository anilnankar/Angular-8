import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ReactiveFormsModule , FormGroup, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from '../notification/notification.service'
import { AppService } from '../app.service';
import { MemberDetailsComponent } from './member-details.component';
import { SpinnerVisibilityService } from 'ng-http-loader';

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MemberDetailsComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        AppService, 
        {provide: NotificationService, useClass: NotifyServiceStub},
        {provide: SpinnerVisibilityService, useClass: SpinnerServiceStub},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('New record should create', () => {
    component.onSubmit();
  });
  
});

class NotifyServiceStub  {
  showSuccess(message, title){
    return of([]);
  }
}

class SpinnerServiceStub  {
  show() {};
  hide() {};
}