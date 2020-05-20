import { TestBed, inject } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs'; // Add import

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it('should be set username', inject([AppService], (service: AppService) => {
    service.setUsername('jon');
    expect(service.username).toEqual('jon');
  }));
  
  // Add tests for all() method
  // describe('getMembers', inject([AppService], (service: AppService) => {

  //   it('should return a collection of members', () => {
  //     const memberResponse = [
  //       {
  //         "firstName": "Anil",
  //         "lastName": "Nankar",
  //         "jobTitle": "Test",
  //         "team": "Formula 2 - Car 63",
  //         "status": "Inactive",
  //         "id": 11
  //       },
  //       {
  //         "firstName": "646",
  //         "lastName": "werte",
  //         "jobTitle": "ewrt",
  //         "team": "World Rally Championship - Car 90",
  //         "status": "Active",
  //         "id": 12
  //       }
  //     ];
      
  //     let response;
  //     spyOn(service, 'getMembers').and.returnValue(of(memberResponse));
  //     service.getMembers().subscribe(res => {
  //       expect(res).toEqual(Promise);
  //     });
  //   });
  // }));

});

