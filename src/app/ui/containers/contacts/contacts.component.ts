import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HelperService } from 'src/app/core/services/helper.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Contact } from 'src/app/core/models/contact';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Array<Contact>;
  group_id: number;
  page =  1;
  errors: any;
  buffering = true;
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private helper: HelperService, private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (e) => {
        this.group_id = e.id;
        this.sync();
      }
    );
  }

  openForm(contact_id?: number) {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '800px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { contact_id: contact_id}
    });
    dialogRef.afterClosed().subscribe(
      () => this.sync()
    );
  }

  sync(append = false) {
    this.buffering = true;
    this.api.get(`/groups/${this.group_id}/contacts`, {page: this.page}).subscribe(
      (res) => {
        this.contacts = append ? this.contacts.concat(res) : res;
        this.buffering = false;
        this.errors = undefined;
      },
      (rej) => {
        console.log(rej);
        // this.errors = rej;
        this.errors = rej.status + ' ' + rej.statusText;
        this.buffering = false;
      }
    );
  }



}
