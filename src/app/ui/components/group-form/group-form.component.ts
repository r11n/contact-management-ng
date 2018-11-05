import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Group } from 'src/app/core/models/group';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/core/services/api.service';
import { HelperService } from 'src/app/core/services/helper.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {
  groupForm: FormGroup;
  group = new Group();
  isEdit: boolean;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public group_data: any,
    private api: ApiService,
    public snackbar: MatSnackBar,
    public helper: HelperService
  ) { this.isEdit = this.group_data.group_id ? true : false; }

  ngOnInit() {
    if (this.isEdit) {
      this.api.get(`/groups/${this.group_data.group_id}`).subscribe(
        (res) => {
          this.group = res;
          this.formInit();
        },
        (rej) => {
          console.log(rej);
        }
      );
    } else {
      this.formInit();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formInit() {
    this.groupForm = this.formBuilder.group({
      id: [this.group.id],
      name: [this.group.name, Validators.required],
      is_favorite: [this.group.is_favorite],
      status: [this.group.status || false, Validators.required],
      user_id: [this.group.user_id]
    });
  }

  onSubmit() {
    if (!this.isEdit) {
      this.api.post( '/groups', {group: this.groupForm.value} ).subscribe(
        (res) => {
          setTimeout(() => {this.onNoClick(); }, 2000);
          this.helper.openSnackBar( this.snackbar, 'Group created Successfully', 3000);
        },
        (err) => {
          this.setErrors(err);
        }
      );
    } else {
      this.api.put( `/groups/${this.group_data.group_id}`, {group: this.groupForm.value} ).subscribe(
        (res) => {
          setTimeout(() => {this.onNoClick(); }, 2000);
          this.helper.openSnackBar( this.snackbar, 'Group updated Successfully', 3000);
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
        if (err.error.hasOwnProperty(key)) {
          this.groupForm.controls[key].setErrors({notUnique: true});
        }
      }
    }
  }


}
