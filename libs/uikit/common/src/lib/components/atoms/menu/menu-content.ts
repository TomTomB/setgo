import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  Inject,
  InjectionToken,
  Injector,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

export const MENU_CONTENT = new InjectionToken<MenuContentDirective>(
  'MenuContent',
);

@Directive()
export abstract class MenuContentBase implements OnDestroy {
  private _portal!: TemplatePortal<unknown>;
  private _outlet!: DomPortalOutlet;

  readonly _attached = new Subject<void>();

  constructor(
    private _template: TemplateRef<unknown>,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
    private _viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  attach(context: Record<string, unknown> = {}) {
    if (!this._portal) {
      this._portal = new TemplatePortal(this._template, this._viewContainerRef);
    }

    this.detach();

    if (!this._outlet) {
      this._outlet = new DomPortalOutlet(
        this._document.createElement('div'),
        this._componentFactoryResolver,
        this._appRef,
        this._injector,
      );
    }

    const element: HTMLElement = this._template.elementRef.nativeElement;

    element.parentNode?.insertBefore(this._outlet.outletElement, element);

    this._changeDetectorRef.markForCheck();

    this._portal.attach(this._outlet, context);
    this._attached.next();
  }

  detach() {
    if (this._portal.isAttached) {
      this._portal.detach();
    }
  }

  ngOnDestroy() {
    if (this._outlet) {
      this._outlet.dispose();
    }
  }
}

@Directive({
  selector: 'ng-template[uikitCommonMenuContent]',
  providers: [{ provide: MENU_CONTENT, useExisting: MenuContentDirective }],
})
export class MenuContentDirective extends MenuContentBase {}
