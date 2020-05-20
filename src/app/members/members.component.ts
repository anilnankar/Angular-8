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

  ngOnInit() {
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
    this.router.navigate(['members-details']);
  }

  editMemberByID(id: number) {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", id.toString());
    this.router.navigate(['members-edit']);
  }

  deleteMemberById(id: number) {
    // this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    // .then((confirmed) => 
    //   console.log('User confirmed:', confirmed))
    // .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    this.appService.deleteMember(id).subscribe( data => {
      this.members = this.members.filter(member =>  member.id !== id);
    });
  }
}
