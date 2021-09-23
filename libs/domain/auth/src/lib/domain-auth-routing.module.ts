import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Views } from './components';

const routes: Routes = [
  {
    path: '',
    component: Views.AuthHostViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'identifier',
      },
      {
        path: 'identifier',
        component: Views.IdentifierViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomainAuthRoutingModule {}
