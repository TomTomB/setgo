import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  isPlatformServer = false;
  isPlatformBrowser = false;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isPlatformServer = isPlatformServer(platformId);
    this.isPlatformBrowser = isPlatformBrowser(platformId);
  }
}
