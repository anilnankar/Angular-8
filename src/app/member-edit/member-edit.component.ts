import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Member } from "../model/member.model";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  memberModel: Member;
  editMemberForm: FormGroup;
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
    let userId = parseInt(window.localStorage.getItem("editUserId"));
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }

    // Fetch the teams
    this.appService.getTeams().subscribe(teams => (this.teams = teams));

    // Set form
    this.editMemberForm = this.fb.group({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl(''),
      team: new FormControl('', Validators.required),
      status: new FormControl('')
    });

    // Fetch user details
    this.appService.getMember(userId).subscribe( data => {
      this.editMemberForm.setValue(data);
    });

  }

  /** 
   * Function update the member details
  */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editMemberForm.invalid) {
      return;
    }

    // Set member model
    this.memberModel = this.editMemberForm.value;
    
    // Update member
    this.appService.updateMember(this.editMemberForm.value.id, this.memberModel).subscribe(data => {
      this.router.navigate(['members']);
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.editMemberForm.controls; }

}
