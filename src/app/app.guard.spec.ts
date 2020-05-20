import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('After login username should not be empty', inject([AuthService], (service: AuthService) => {
    service.login('admin', '@welcome1');
    expect(service.userName).not.toBe(null);
  }));
  
  it('After login username should set proper username', inject([AuthService], (service: AuthService) => {
    service.login('admin', '123456');
    expect(service.userName).toEqual('admin');
  }));
  
  it('After login successfull', inject([AuthService], (service: AuthService) => {
    service.login('admin', '123456');
    expect(service.isloggedIn).toEqual(true);
  }));

  it('Check local storage username after login', inject([AuthService], (service: AuthService) => {
    service.login('admin', '123456');
    expect(localStorage.getItem('username')).toEqual('admin');
  }));

  it('After logout Local storage shoule be clear', inject([AuthService], (service: AuthService) => {
    service.login('admin', '123456');
    expect(localStorage.getItem('username')).toEqual('admin');

    service.logoutUser();
    expect(localStorage.getItem('username')).toBe(null);
  }));

});

