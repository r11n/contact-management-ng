import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './ui/containers/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginActivateChild } from './core/guards/login.activatechild';
import { GroupsComponent } from './ui/containers/groups/groups.component';
import { ContactsComponent } from './ui/containers/contacts/contacts.component';
import { GroupsResolver } from './ui/resolvers/groups.resolver';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [LoginActivateChild],
    children: [
      {
        path: '',
        component: GroupsComponent,
        resolve: {groups: GroupsResolver}
      },
      {
        path: 'groups/:id/contacts',
        component: ContactsComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
