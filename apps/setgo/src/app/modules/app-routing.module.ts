import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      [
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
