import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Views } from './components';

const routes: Routes = [
  {
    path: '',
    component: Views.AuthHostComponent,
    children: [
      {
        path: '',
        redirectTo: 'identifier',
      },
      {
        path: 'identifier',
        component: Views.IdentifierComponent,
      },
      {
        path: 'challenge/password',
        component: Views.ChallengePasswordComponent,
      },
      {
        path: 'reset-password',
        component: Views.ResetPasswordComponent,
      },
      {
        path: 'register',
        component: Views.RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomainAuthRoutingModule {}
