import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Member } from "./model/member.model";

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:8000/api';
  username: string;

  constructor(private http: HttpClient) {}

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  getMember(id: number) {
    return this.http
      .get(`${this.api}/members/`+id)
      .pipe(catchError(this.handleError));
  }

  addMember(memberForm: Member) {
    return this.http
      .post(`${this.api}/members`, memberForm, headerOption);
  }

  deleteMember(id) {
    return this.http
      .delete(`${this.api}/members/`+id);
  }

  getTeams() {  
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
