import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Member } from "../model/member.model";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(
    private fb: FormBuilder, 
    private appService: AppService, 
    private router: Router) {}

  /** 
   * Function fetch team list and set member form
  */
  ngOnInit() {
    // Fetch the teams
    this.appService.getTeams().subscribe(teams => (this.teams = teams));

    // Set form
    this.memberForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl(''),
      team: new FormControl('', Validators.required),
      status: new FormControl('')
    });
  }

  /** 
   * Function create new member
  */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.memberForm.invalid) {
      return;
    }

    this.memberModel = this.memberForm.value;

    // Add new member
    this.appService.addMember(this.memberModel).subscribe(data => {
      this.router.navigate(['members']);
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.memberForm.controls; }

}
