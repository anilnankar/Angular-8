import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(
    public appService: AppService, 
    private router: Router) {}

  /** 
   * Function fetch all members
  */
  ngOnInit() {
    // Call fetch all members API and set response in members array
    this.appService.getMembers()
      .subscribe(members => (this.members = members));
  }

  /** 
   * Function redirect to create member form
  */
  goToAddMemberForm() {
    this.router.navigate(['members-details']);
  }

  /** 
   * Function redirect to edit member form
  */
  editMemberByID(id: number) {
    // Set selected user id 
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", id.toString());

    // Redirect to edit member page
    this.router.navigate(['members-edit']);
  }

  /** 
   * Function delete the member
  */
 deleteMemberById(id: number) {
    // this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    // .then((confirmed) => 
    //   console.log('User confirmed:', confirmed))
    // .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    // Call delete member API
    this.appService.deleteMember(id).subscribe( data => {
      this.members = this.members.filter(member =>  member.id !== id);
    });
  }
}
