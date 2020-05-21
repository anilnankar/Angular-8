import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MembersComponent } from './members.component';

import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NotificationService } from '../notification/notification.service'
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { SpinnerVisibilityService } from 'ng-http-loader';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MembersComponent
      ],    
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        AppService,
        {provide: NotificationService, useClass: NotifyServiceStub},
        {provide: SpinnerVisibilityService, useClass: SpinnerServiceStub},
        {provide: ConfirmationDialogService, useClass: ConfirmationDialogStub}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load members collection', () => {
    component.ngOnInit();
    expect(component.members).not.toBe(null);
  });
});

class NotifyServiceStub  {
  showSuccess(message, title){
    return of([]);
  }
}

class ConfirmationDialogStub  {
  confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
      return ;
  }
}

class SpinnerServiceStub  {
  show() {};
  hide() {};
}