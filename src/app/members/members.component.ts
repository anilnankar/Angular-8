import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service'
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];
    
  constructor(
    public appService: AppService,
    private notifyService : NotificationService, 
    private confirmationDialogService: ConfirmationDialogService,
    private spinner: SpinnerVisibilityService,
    private router: Router) {}

  /** 
   * Function fetch all members
  */
  ngOnInit() {
    // Show Loader
    this.spinner.show();

    // Call fetch all members API and set response in members array
    this.appService.getMembers()
      .subscribe(members => {
        // Set Members 
        this.members = members

        // Hide Loader
        this.spinner.hide();    
    });
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
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete member ?')
    .then((confirmed) => {
      console.log(confirmed);
      if(confirmed) {
        // Show Loader
        this.spinner.show();

        // Call delete member API
        this.appService.deleteMember(id).subscribe( data => {
          this.members = this.members.filter(member =>  member.id !== id);

          // Set Notification
          this.notifyService.showSuccess("Member deleted successfully", "Success!")
          
          // Hide Loader
          this.spinner.hide();    
        });
      }
    })
    .catch(() => 
      console.log('User discard to delete.')
    );
  }
}
