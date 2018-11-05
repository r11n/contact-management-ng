import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './containers/layout/layout.component';
import { HeaderComponent } from './containers/header/header.component';
import { RouterModule } from '@angular/router';
import { GroupsComponent } from './containers/groups/groups.component';
import { ContactsComponent } from './containers/contacts/contacts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [LayoutComponent, HeaderComponent, GroupsComponent, ContactsComponent]
})
export class UiModule { }
