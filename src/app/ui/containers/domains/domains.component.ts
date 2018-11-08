import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {
  domains: Array<string>;
  errors: string;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('/allowed_domains').subscribe(
      (res) => {
        this.domains = res.domains;
      },
      (rej) => {
        this.api.unauthLogOut(rej.status);
        this.errors = rej.status + ' ' + rej.statusText;
      }
    );
  }

}
