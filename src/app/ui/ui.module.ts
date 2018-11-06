import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './containers/layout/layout.component';
import { HeaderComponent } from './containers/header/header.component';
import { RouterModule } from '@angular/router';
import { GroupsComponent } from './containers/groups/groups.component';
import { ContactsComponent } from './containers/contacts/contacts.component';
import { MaterialImportModule } from '../core/theme_modules/materialimport.module';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomainsComponent } from './containers/domains/domains.component';
import { DomainFormComponent } from './components/domain-form/domain-form.component';
import { ContactShowComponent } from './components/contact-show/contact-show.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialImportModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    GroupsComponent,
    ContactsComponent,
    GroupFormComponent,
    ContactFormComponent,
    DomainsComponent,
    DomainFormComponent,
    ContactShowComponent],
  entryComponents: [
    GroupFormComponent,
    ContactFormComponent,
    DomainFormComponent,
    ContactShowComponent
  ]
})
export class UiModule { }
