import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestComponent } from '../test.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          component: TestComponent,
        },
        {
          path: '**',
          redirectTo: '/',
        },
      ],
      {
        initialNavigation: 'enabled',
        anchorScrolling: 'enabled',
        paramsInheritanceStrategy: 'always',
        scrollPositionRestoration: 'enabled',
      },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
