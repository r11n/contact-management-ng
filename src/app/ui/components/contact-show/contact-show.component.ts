import { Component, OnInit, Inject } from '@angular/core';
import { Contact } from '../../../core/models/contact';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-contact-show',
  templateUrl: './contact-show.component.html',
  styleUrls: ['./contact-show.component.scss']
})
export class ContactShowComponent implements OnInit {
  contact = new Contact();
  constructor(
    @Inject(MAT_DIALOG_DATA) public contact_data: any,
    public dialogRef: MatDialogRef<ContactShowComponent>,
    private api: ApiService
    ) { }

  ngOnInit() {
    this.api.get(`/groups/${this.contact_data.group_id}/contacts/${this.contact_data.contact_id}`).subscribe(
      (res) => {
        this.contact = res;
      },
      (rej) => {
        this.api.unauthLogOut(rej.status);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
