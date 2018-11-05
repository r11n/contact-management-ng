import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { GroupFormComponent } from '../../components/group-form/group-form.component';
import { HelperService } from 'src/app/core/services/helper.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: Array<any>;
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private helper: HelperService, private api: ApiService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        map(data => data['groups'])
      ).subscribe((res) => {
        this.groups = res;
      });
  }

  openForm(group_id?: number) {
    const dialogRef = this.dialog.open(GroupFormComponent, {
      width: '800px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { group_id: group_id}
    });
    dialogRef.afterClosed().subscribe(
      () => this.sync()
    );
  }

  makeBg(id) {
    return this.helper.make_bg_color(id, true);
  }

  sync() {
    this.api.get('/groups').subscribe(
      (res) => {
        this.groups = res;
      }
    );
  }

}
