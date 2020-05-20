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
  // API URL
  api = 'http://localhost:8000/api';
  username: string;

  constructor(private http: HttpClient) {}

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  // Set username
  setUsername(name: string): void {
    this.username = name;
  }

  // Get member
  getMember(id: number) {
    return this.http
      .get(`${this.api}/members/`+id)
      .pipe(catchError(this.handleError));
  }

  // Add new member
  addMember(memberForm: Member) {
    return this.http
      .post(`${this.api}/members`, memberForm, headerOption);
  }

  // Update member
  updateMember(id: number, memberForm: Member) {
    return this.http
      .put(`${this.api}/members/`+id, memberForm, headerOption);
  }

  // Delete member
  deleteMember(id) {
    return this.http
      .delete(`${this.api}/members/`+id);
  }

  // Get all teams
  getTeams() {  
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  // Error handler
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
