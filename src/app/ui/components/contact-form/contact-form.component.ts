import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Contact } from '../../../core/models/contact';
import { ContactNumber } from '../../../core/models/contact_number';
import { ContactEmail } from '../../../core/models/contact_email';
import { ContactAddress } from '../../../core/models/contact_address';
import { ApiService } from '../../../core/services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { HelperService } from '../../../core/services/helper.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contact = new Contact();
  number = new ContactNumber();
  email = new ContactEmail();
  address = new ContactAddress();
  isEdit: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public contact_data: any,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    private helper: HelperService,
    private snackbar: MatSnackBar
  ) { this.isEdit = this.contact_data.contact_id ? true : false; }

  ngOnInit() {
    if (this.isEdit) {
      this.api.get(`/groups/${this.contact_data.group_id}/contacts/${this.contact_data.contact_id}`).subscribe(
        (res) => {
          this.contact = res;
          this.formInit();
        },
        (rej) => {
          this.api.unauthLogOut(rej.status);
        }
      );
    } else {
      this.formInit();
    }
  }

  formInit() {
    this.contactForm = this.formBuilder.group({
      name: [this.contact.name, Validators.required],
      is_favorite: [this.contact.is_favorite],
      group_id: [(
        this.contact.group_id !== undefined && this.contact.group_id !== null) ? this.contact.group_id : this.contact_data.group_id],
      user_id: [this.contact.user_id],
      contact_numbers_attributes: this.formBuilder.array( this.isEdit ? [] : [this.initNumber(this.number)]),
      contact_emails_attributes: this.formBuilder.array( this.isEdit ? [] : [this.initEmail(this.email)]),
      contact_addresses_attributes: this.formBuilder.array( this.isEdit ? [] : [this.initAddress(this.address)]),
    });

    if (this.isEdit) {
      this.setAttrs(this.contact.contact_numbers, 'number');
      this.setAttrs(this.contact.contact_emails, 'email');
      this.setAttrs(this.contact.contact_addresses, 'address');
    }
  }

  initNumber(number: ContactNumber) {
    return this.formBuilder.group({
      id: [number.id],
      contact_type: [number.contact_type, Validators.required],
      number: [number.number, Validators.required],
      contact_id: [number.contact_id || this.contact_data.contact_id || null]
    });
  }

  initEmail(email: ContactEmail) {
    return this.formBuilder.group({
      id: [email.id],
      contact_type: [email.contact_type, Validators.required],
      email: [email.email, Validators.required],
      contact_id: [email.contact_id || this.contact_data.contact_id || null]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.isEdit) {
      this.api.post( `/groups/${this.contact_data.group_id}/contacts`, {contact: this.contactForm.value} ).subscribe(
        (res) => {
          setTimeout(() => {this.onNoClick(); }, 2000);
          this.helper.openSnackBar( this.snackbar, 'Contact created Successfully', 3000);
        },
        (err) => {
          this.setErrors(err);
        }
      );
    } else {
      this.api.put(
        `/groups/${this.contact_data.group_id}/contacts/${this.contact_data.contact_id}`,
        {contact: this.contactForm.value} ).subscribe(
        (res) => {
          setTimeout(() => {this.onNoClick(); }, 2000);
          this.helper.openSnackBar( this.snackbar, 'Contact updated Successfully', 3000);
        },
        (err) => {
          this.setErrors(err);
        }
      );
    }
  }

  setErrors(err) {
    const emsg = this.helper.errorMessageParser(err.error);
    this.helper.openSnackBar( this.snackbar, emsg, 5000);
    if (err.error instanceof Object) {
      for (const key in err.error) {
        if (err.error.hasOwnProperty(key) && this.contactForm.controls[key]) {
          this.contactForm.controls[key].setErrors({notUnique: true});
        }
      }
    }
  }

  initAddress(address: ContactAddress) {
    return this.formBuilder.group({
      id: [address.id],
      contact_type: [address.contact_type, Validators.required],
      address: [address.address, Validators.required],
      contact_id: [address.contact_id || this.contact_data.contact_id || null]
    });
  }

  setAttrs(attr_array, type: 'number'|'email'|'address') {
    if (type === 'number') {
      const control = <FormArray>this.contactForm.controls.contact_numbers_attributes;
      attr_array.forEach(x => {
        control.push(this.initNumber(x));
      });
      if (attr_array.length === 0) {
        control.push(this.initNumber(this.number));
      }
    } else if (type === 'email') {
      const control = <FormArray>this.contactForm.controls.contact_emails_attributes;
      attr_array.forEach(x => {
        control.push(this.initEmail(x));
      });
      if (attr_array.length === 0) {
        control.push(this.initEmail(this.email));
      }
    } else {
      const control = <FormArray>this.contactForm.controls.contact_addresses_attributes;
      attr_array.forEach(x => {
        control.push(this.initAddress(x));
      });
      if (attr_array.length === 0) {
        control.push(this.initAddress(this.address));
      }
    }
  }

  addAttr(type: 'number'|'email'|'address') {
    if (type === 'number') {
      const control = <FormArray>this.contactForm.controls.contact_numbers_attributes;
      control.push(this.initNumber(this.number));
    } else if (type === 'email') {
      const control = <FormArray>this.contactForm.controls.contact_emails_attributes;
      control.push(this.initEmail(this.email));
    } else {
      const control = <FormArray>this.contactForm.controls.contact_addresses_attributes;
      control.push(this.initAddress(this.address));
    }
  }

  removeAttr(i: number, type: 'number'|'email'|'address') {
    let control, cform;
    if (type === 'number') {
      control = <FormArray>this.contactForm.controls.contact_numbers_attributes;
      cform = control.at(i);
    } else if (type === 'email') {
      control = <FormArray>this.contactForm.controls.contact_emails_attributes;
      cform = control.at(i);
    } else {
      control = <FormArray>this.contactForm.controls.contact_addresses_attributes;
      cform = control.at(i);
    }
    if (cform.value.id) {
      this.deleteasyncAttr(cform.value.id, type);
    }
    control.removeAt(i);
  }

  deleteasyncAttr(id: number, type: 'number'|'email'|'address') {
    this.api.post(`/groups/${this.contact_data.group_id}/contacts/${this.contact_data.contact_id}/delete/${id}/${type}`).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

}
