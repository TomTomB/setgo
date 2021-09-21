import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { FocusMonitor, FocusOrigin, FocusableOption } from '@angular/cdk/a11y';
import { MENU_PANEL, MenuPanel } from './menu-panel';
import { Subject } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[uikit-common-menu-item]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.role]': 'role',
    '[class.mat-menu-item]': 'true',
    '[class.mat-menu-item-highlighted]': '_highlighted',
    '[class.mat-menu-item-submenu-trigger]': '_triggersSubmenu',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.disabled]': 'disabled || null',
    class: 'mat-focus-indicator',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'menu-item.html',
})
export class MenuItemComponent
  implements FocusableOption, AfterViewInit, OnDestroy
{
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_disableRipple: BooleanInput;

  @Input()
  role: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox' = 'menuitem';

  // TODO (TRB): ???
  disabled = false;

  readonly _hovered: Subject<MenuItemComponent> =
    new Subject<MenuItemComponent>();

  readonly _focused = new Subject<MenuItemComponent>();

  _highlighted = false;
  _triggersSubmenu = false;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _focusMonitor: FocusMonitor,
    @Inject(MENU_PANEL)
    @Optional()
    public _parentMenu?: MenuPanel<MenuItemComponent>,
  ) {}

  focus(origin?: FocusOrigin, options?: FocusOptions): void {
    if (this._focusMonitor && origin) {
      this._focusMonitor.focusVia(this._getHostElement(), origin, options);
    } else {
      this._getHostElement().focus(options);
    }

    this._focused.next(this);
  }

  ngAfterViewInit() {
    if (this._focusMonitor) {
      this._focusMonitor.monitor(this._elementRef, false);
    }
  }

  ngOnDestroy() {
    if (this._focusMonitor) {
      this._focusMonitor.stopMonitoring(this._elementRef);
    }

    this._hovered.complete();
    this._focused.complete();
  }

  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  _getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  @HostListener('click', ['$event'])
  _checkDisabled(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  @HostListener('mouseenter')
  _handleMouseEnter() {
    this._hovered.next(this);
  }

  getLabel(): string {
    const clone = this._elementRef.nativeElement.cloneNode(true) as HTMLElement;
    const icons = clone.querySelectorAll('mat-icon, .material-icons');

    for (let i = 0; i < icons.length; i++) {
      const icon = icons[i];
      icon.parentNode?.removeChild(icon);
    }

    return clone.textContent?.trim() || '';
  }

  _setHighlighted(isHighlighted: boolean) {
    this._highlighted = isHighlighted;
    this._changeDetectorRef.markForCheck();
  }
}
