import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isMobile$ = this._breakpointObserver.observe('(max-width: 767px)').pipe(
    map((v) => v.matches),
    shareReplay(),
  );

  constructor(private _breakpointObserver: BreakpointObserver) {}
}
