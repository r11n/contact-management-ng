import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  is_admin: boolean;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAdmin().subscribe(
      (res) => {
        this.is_admin = res.is_admin;
      },
      (rej) => {
        this.is_admin = false;
      }
    );
  }

}
