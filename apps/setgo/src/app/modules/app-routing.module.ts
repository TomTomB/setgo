import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            import('@setgo/domain/auth').then((m) => m.DomainAuthModule),
        },
        {
          path: '**',
          redirectTo: 'auth',
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
