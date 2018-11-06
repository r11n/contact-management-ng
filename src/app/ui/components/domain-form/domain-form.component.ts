import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-domain-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.scss']
})
export class DomainFormComponent implements OnInit {
  domains: Array<string>;
  selectable =  false;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DomainFormComponent>) { }
  ngOnInit() {
    this.api.get('/admin/allowed_domains').subscribe(
      (res) => {
        this.domains = res.domains;
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.domains.push(value.trim().toLowerCase());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.sync();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  remove(domain: string): void {
    const index = this.domains.indexOf(domain);
    if (index >= 0) {
      this.domains.splice(index, 1);
    }
    this.sync();
  }

  sync() {
    this.api.post('/admin/allowed_domains/save_domains', {domains: this.domains}).subscribe(
      (res) => {
        this.domains = res.domains;
      },
      (rej) => {
        this.api.unauthLogOut(rej.status);
      }
    );
  }

}
