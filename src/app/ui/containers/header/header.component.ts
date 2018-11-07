import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { MatDialog } from '@angular/material';
import { DomainFormComponent } from '../../components/domain-form/domain-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  is_admin: boolean;
  constructor(private auth: AuthService, private router: Router, private storage: StorageService, private dialog: MatDialog) { }

  ngOnInit() {
    this.auth.isAdmin().subscribe(
      (res) => {
        this.is_admin = res.is_admin;
        console.log(this.is_admin);
      },
      (rej) => {
        this.is_admin = false;
      }
    );
  }

  signOut() {
    this.storage.clear();
    this.router.navigateByUrl('/login');
  }

  openForm() {
    const dialogRef = this.dialog.open(DomainFormComponent, {
      width: '800px',
      maxWidth: '100vw',
      maxHeight: '100vh'
    });
  }

}
