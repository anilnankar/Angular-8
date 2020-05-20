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
export class MemberEditComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) {}

  ngOnInit() {
    let userId = parseInt(window.localStorage.getItem("editUserId"));
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }

    // Fetch the teams
    this.appService.getTeams().subscribe(teams => (this.teams = teams));

    this.memberForm = this.fb.group({
      id: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });

    this.appService.getMember(userId).subscribe( data => {
      this.memberForm.setValue(data);
    });

  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit() {
    this.memberModel = this.memberForm.value;
    
    // Add new member
    this.appService.updateMember(this.memberForm.value.id, this.memberModel).subscribe(data => {
      this.router.navigate(['members']);
    });

  }
}
