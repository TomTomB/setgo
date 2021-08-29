import { Animations } from '@setgo/uikit/common';
import { AuthFacade, fetchSignInMethodsForEmail } from '@setgo/store/auth';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MappedEntityState } from '@tomtomb/ngrx-toolkit';
import { Observable } from 'rxjs';
import { RouterFacade } from '@setgo/store/router';
import { ServiceWorkerFacade } from '@setgo/store/service-worker';
import { TextFieldComponent, ValidatorsExtra } from '@setgo/uikit/forms';
import { UiShellFacade } from '@setgo/store/ui/shell';
import { UiTriggerAction, UpdateAvailableEventWithData } from '@setgo/types';
import { environment } from '@setgo/env';

@Component({
  selector: 'setgo-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [Animations.growShrink, Animations.slideFromTop],
})
export class AppComponent implements OnInit {
  @ViewChild(TextFieldComponent)
  emailFieldRef?: TextFieldComponent;

  version = environment.version;

  fetchSignInMethodsForEmailStore?: MappedEntityState<
    typeof fetchSignInMethodsForEmail
  >;

  emailForm = new FormGroup({
    email: new FormControl(null, [ValidatorsExtra.email, Validators.required]),
  });

  hasAvailableUpdate$!: Observable<boolean>;
  availableUpdate$!: Observable<UpdateAvailableEventWithData | null>;

  notificationShadeVisibility$!: Observable<UiTriggerAction>;

  isMouseDownOnNotification = false;

  get emailControl() {
    return this.emailForm.controls.email as FormControl;
  }

  constructor(
    private _authFacade: AuthFacade,
    private _serviceWorkerFacade: ServiceWorkerFacade,
    private _uiShellFacade: UiShellFacade,
    private _stuff: RouterFacade,
  ) {}

  ngOnInit(): void {
    this._serviceWorkerFacade.startPolling();

    this.hasAvailableUpdate$ = this._serviceWorkerFacade.hasAvailableUpdate$;
    this.availableUpdate$ = this._serviceWorkerFacade.availableUpdate$;

    this.notificationShadeVisibility$ =
      this._uiShellFacade.notificationShadeVisibility$;
  }

  update() {
    window.location.reload();
  }

  checkEmail() {
    if (this.emailForm.invalid) {
      this.emailFieldRef?.inputComponentRef?.nativeInputRef?.nativeElement.focus();
      return;
    }

    this.fetchSignInMethodsForEmailStore =
      this._authFacade.fetchSignInMethodsForEmail({
        body: { email: this.emailForm.value.email },
      });
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    if (theme === 'system') {
      window.localStorage.removeItem('theme');

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      window.localStorage.setItem('theme', theme);

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  setNotificationShadeVisibility(uiAction: UiTriggerAction) {
    this._uiShellFacade.dispatchSetNotificationShadeVisibility(uiAction);
  }

  notificationMouseDown(e: TouchEvent) {
    // console.log('down', e);
    e.preventDefault();
    this.isMouseDownOnNotification = true;

    const element = (e.target as HTMLElement).parentElement as HTMLDivElement;
    element.classList.remove('transition-all');
  }

  notificationMouseMove(e: TouchEvent) {
    if (!this.isMouseDownOnNotification) {
      return;
    }
    e.preventDefault();

    const element = (e.target as HTMLElement).parentElement as HTMLDivElement;
    const previousClientX = parseInt(element.dataset.previousClientX || '0');
    let transformX = parseInt(element.dataset.transformX || '0');

    if (previousClientX < e.targetTouches[0].clientX) {
      transformX = transformX + 2;
    } else if (previousClientX > e.targetTouches[0].clientX) {
      transformX = transformX - 2;
    }

    element.dataset.previousClientX = e.targetTouches[0].clientX.toString();
    element.dataset.transformX = transformX.toString();

    element.style.transform = `translateX(${transformX}px)`;

    // console.log('move', e);
  }

  notificationMouseUp(e: TouchEvent) {
    // console.log('up', e);
    e.preventDefault();

    this.isMouseDownOnNotification = false;

    const element = (e.target as HTMLElement).parentElement as HTMLDivElement;
    delete element.dataset.previousClientX;
    delete element.dataset.transformX;
    element.style.transform = '';
    element.classList.add('transition-all');
  }
}
