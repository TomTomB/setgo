import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollStrategy,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import {
  FocusMonitor,
  FocusOrigin,
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader,
} from '@angular/cdk/a11y';
import { MENU_PANEL, MenuPanel } from './menu-panel';
import { MenuBaseDirective, MenuCloseReason } from './menu';
import { MenuItemComponent } from './menu-item';
import { MenuPositionX, MenuPositionY } from './menu-positions';
import {
  Observable,
  Subscription,
  asapScheduler,
  merge,
  of as observableOf,
} from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import {
  throwMatMenuMissingError,
  throwMatMenuRecursiveError,
} from './menu-errors';

export const MENU_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>(
  'mat-menu-scroll-strategy',
);

export function MENU_SCROLL_STRATEGY_FACTORY(
  overlay: Overlay,
): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

export const MENU_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: MENU_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MENU_SCROLL_STRATEGY_FACTORY,
};

export const MENU_PANEL_TOP_PADDING = 8;

const passiveEventListenerOptions = normalizePassiveListenerOptions({
  passive: true,
});

@Directive()
export abstract class MenuTriggerBase implements AfterContentInit, OnDestroy {
  _openedBy: Exclude<FocusOrigin, 'program' | null> | undefined = undefined;

  @HostBinding('attr.aria-haspopup')
  _ariaHaspopup = true;

  @Input()
  menuData!: Record<string, unknown>;

  @Input()
  restoreFocus = true;

  @Output()
  readonly menuOpened: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  readonly menuClosed: EventEmitter<void> = new EventEmitter<void>();

  private _menu!: MenuPanel;

  private _portal!: TemplatePortal;
  private _overlayRef: OverlayRef | null = null;
  private _menuOpen = false;
  private _closingActionsSubscription = Subscription.EMPTY;
  private _hoverSubscription = Subscription.EMPTY;
  private _menuCloseSubscription = Subscription.EMPTY;
  private _scrollStrategy: () => ScrollStrategy;

  private _parentMaterialMenu: MenuBaseDirective | undefined;

  private _handleTouchStart = (event: TouchEvent) => {
    if (!isFakeTouchstartFromScreenReader(event)) {
      this._openedBy = 'touch';
    }
  };

  @HostBinding('attr.aria-expanded')
  get _ariaExpanded() {
    return this.menuOpen || null;
  }

  @HostBinding('attr.aria-controls')
  get _ariaControl() {
    return this.menuOpen ? this.menu.panelId : null;
  }

  @Input('uikitCommonMenuTriggerFor')
  get menu() {
    return this._menu;
  }
  set menu(menu: MenuPanel) {
    if (menu === this._menu) {
      return;
    }

    this._menu = menu;
    this._menuCloseSubscription.unsubscribe();

    if (menu) {
      if (menu === this._parentMaterialMenu) {
        throwMatMenuRecursiveError();
      }

      this._menuCloseSubscription = menu.closed.subscribe(
        (reason: MenuCloseReason) => {
          this._destroyMenu(reason);
          if (
            (reason === 'click' || reason === 'tab') &&
            this._parentMaterialMenu
          ) {
            this._parentMaterialMenu.closed.emit(reason);
          }
        },
      );
    }
  }

  constructor(
    private _overlay: Overlay,
    private _element: ElementRef<HTMLElement>,
    private _viewContainerRef: ViewContainerRef,
    @Inject(MENU_SCROLL_STRATEGY) scrollStrategy: () => ScrollStrategy,
    @Inject(MENU_PANEL) @Optional() parentMenu: MenuPanel,
    @Optional() @Self() private _menuItemInstance: MenuItemComponent,
    @Optional() private _dir: Directionality,
    private _cdr: ChangeDetectorRef,
    private _focusMonitor: FocusMonitor,
  ) {
    this._scrollStrategy = scrollStrategy;
    this._parentMaterialMenu =
      parentMenu instanceof MenuBaseDirective ? parentMenu : undefined;

    _element.nativeElement.addEventListener(
      'touchstart',
      this._handleTouchStart,
      passiveEventListenerOptions,
    );

    if (_menuItemInstance) {
      _menuItemInstance._triggersSubmenu = this.triggersSubmenu();
    }
  }

  ngAfterContentInit() {
    this._checkMenu();
    this._handleHover();
  }

  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }

    this._element.nativeElement.removeEventListener(
      'touchstart',
      this._handleTouchStart,
      passiveEventListenerOptions,
    );

    this._menuCloseSubscription.unsubscribe();
    this._closingActionsSubscription.unsubscribe();
    this._hoverSubscription.unsubscribe();
  }

  get menuOpen(): boolean {
    return this._menuOpen;
  }

  get dir(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  triggersSubmenu(): boolean {
    return !!(this._menuItemInstance && this._parentMaterialMenu);
  }

  toggleMenu(): void {
    return this._menuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    if (this._menuOpen) {
      return;
    }

    this._checkMenu();

    const overlayRef = this._createOverlay();
    const overlayConfig = overlayRef.getConfig();

    this._setPosition(
      overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy,
    );
    overlayConfig.hasBackdrop =
      this.menu.hasBackdrop == null
        ? !this.triggersSubmenu()
        : this.menu.hasBackdrop;
    overlayRef.attach(this._getPortal());

    if (this.menu.lazyContent) {
      this.menu.lazyContent.attach(this.menuData);
    }

    this._closingActionsSubscription = this._menuClosingActions().subscribe(
      () => this.closeMenu(),
    );
    this._initMenu();

    if (this.menu instanceof MenuBaseDirective) {
      this.menu._startAnimation();
    }
  }

  closeMenu(): void {
    this.menu.closed.emit();
  }

  focus(origin?: FocusOrigin, options?: FocusOptions) {
    if (this._focusMonitor && origin) {
      this._focusMonitor.focusVia(this._element, origin, options);
    } else {
      this._element.nativeElement.focus(options);
    }
  }

  updatePosition(): void {
    this._overlayRef?.updatePosition();
  }

  private _destroyMenu(reason: MenuCloseReason) {
    if (!this._overlayRef || !this.menuOpen) {
      return;
    }

    const menu = this.menu;
    this._closingActionsSubscription.unsubscribe();
    this._overlayRef.detach();

    if (
      this.restoreFocus &&
      (reason === 'keydown' || !this._openedBy || !this.triggersSubmenu())
    ) {
      this.focus(this._openedBy);
    }

    this._openedBy = undefined;

    if (menu instanceof MenuBaseDirective) {
      menu._resetAnimation();

      if (menu.lazyContent) {
        menu._animationDone
          .pipe(
            filter((event) => event.toState === 'void'),
            take(1),
            takeUntil(menu.lazyContent._attached),
          )
          .subscribe({
            next: () => menu.lazyContent.detach(),
            complete: () => this._setIsMenuOpen(false),
          });
      } else {
        this._setIsMenuOpen(false);
      }
    } else {
      this._setIsMenuOpen(false);

      if (menu.lazyContent) {
        menu.lazyContent.detach();
      }
    }
  }

  private _initMenu(): void {
    this.menu.parentMenu = this.triggersSubmenu()
      ? this._parentMaterialMenu
      : undefined;
    this.menu.direction = this.dir;
    this._setMenuElevation();
    this.menu.focusFirstItem(this._openedBy || 'program');
    this._setIsMenuOpen(true);
  }

  private _setMenuElevation(): void {
    if (this.menu.setElevation) {
      let depth = 0;
      let parentMenu = this.menu.parentMenu;

      while (parentMenu) {
        depth++;
        parentMenu = parentMenu.parentMenu;
      }

      this.menu.setElevation(depth);
    }
  }

  private _setIsMenuOpen(isOpen: boolean): void {
    this._menuOpen = isOpen;
    this._menuOpen ? this.menuOpened.emit() : this.menuClosed.emit();

    if (this.triggersSubmenu()) {
      this._menuItemInstance._setHighlighted(isOpen);
    }

    this._cdr.markForCheck();
  }

  private _checkMenu() {
    if (!this.menu) {
      throwMatMenuMissingError();
    }
  }

  private _createOverlay(): OverlayRef {
    if (!this._overlayRef) {
      const config = this._getOverlayConfig();
      this._subscribeToPositions(
        config.positionStrategy as FlexibleConnectedPositionStrategy,
      );
      this._overlayRef = this._overlay.create(config);

      this._overlayRef.keydownEvents().subscribe();
    }

    return this._overlayRef;
  }

  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._element)
        .withLockedPosition()
        .withGrowAfterOpen()
        .withTransformOriginOn('.mat-menu-panel, .mat-mdc-menu-panel'),
      backdropClass:
        this.menu.backdropClass || 'cdk-overlay-transparent-backdrop',
      panelClass: this.menu.overlayPanelClass,
      scrollStrategy: this._scrollStrategy(),
      direction: this._dir,
    });
  }

  private _subscribeToPositions(
    position: FlexibleConnectedPositionStrategy,
  ): void {
    if (this.menu.setPositionClasses) {
      position.positionChanges.subscribe((change) => {
        const posX: MenuPositionX =
          change.connectionPair.overlayX === 'start' ? 'after' : 'before';
        const posY: MenuPositionY =
          change.connectionPair.overlayY === 'top' ? 'below' : 'above';

        this.menu.setPositionClasses?.(posX, posY);
      });
    }
  }

  private _setPosition(positionStrategy: FlexibleConnectedPositionStrategy) {
    let [originX, originFallbackX]: HorizontalConnectionPos[] =
      this.menu.xPosition === 'before' ? ['end', 'start'] : ['start', 'end'];

    const [overlayY, overlayFallbackY]: VerticalConnectionPos[] =
      this.menu.yPosition === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];

    let [originY, originFallbackY] = [overlayY, overlayFallbackY];
    let [overlayX, overlayFallbackX] = [originX, originFallbackX];
    let offsetY = 0;

    if (this.triggersSubmenu()) {
      overlayFallbackX = originX =
        this.menu.xPosition === 'before' ? 'start' : 'end';
      originFallbackX = overlayX = originX === 'end' ? 'start' : 'end';
      offsetY =
        overlayY === 'bottom'
          ? MENU_PANEL_TOP_PADDING
          : -MENU_PANEL_TOP_PADDING;
    } else if (!this.menu.overlapTrigger) {
      originY = overlayY === 'top' ? 'bottom' : 'top';
      originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
    }

    positionStrategy.withPositions([
      { originX, originY, overlayX, overlayY, offsetY },
      {
        originX: originFallbackX,
        originY,
        overlayX: overlayFallbackX,
        overlayY,
        offsetY,
      },
      {
        originX,
        originY: originFallbackY,
        overlayX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY,
      },
      {
        originX: originFallbackX,
        originY: originFallbackY,
        overlayX: overlayFallbackX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY,
      },
    ]);
  }

  private _menuClosingActions() {
    if (!this._overlayRef) {
      throw new Error('this._overlayRef is undefined');
    }

    const backdrop = this._overlayRef.backdropClick();
    const detachments = this._overlayRef.detachments();
    const parentClose = this._parentMaterialMenu
      ? this._parentMaterialMenu.closed
      : observableOf();
    const hover = this._parentMaterialMenu
      ? this._parentMaterialMenu._hovered().pipe(
          filter((active) => active !== this._menuItemInstance),
          filter(() => this._menuOpen),
        )
      : observableOf();

    return merge(
      backdrop,
      parentClose as Observable<MenuCloseReason>,
      hover,
      detachments,
    );
  }

  @HostListener('mousedown', ['$event'])
  _handleMousedown(event: MouseEvent): void {
    if (!isFakeMousedownFromScreenReader(event)) {
      this._openedBy = event.button === 0 ? 'mouse' : undefined;

      if (this.triggersSubmenu()) {
        event.preventDefault();
      }
    }
  }

  @HostListener('keydown', ['$event'])
  _handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;

    if (keyCode === ENTER || keyCode === SPACE) {
      this._openedBy = 'keyboard';
    }

    if (
      this.triggersSubmenu() &&
      ((keyCode === RIGHT_ARROW && this.dir === 'ltr') ||
        (keyCode === LEFT_ARROW && this.dir === 'rtl'))
    ) {
      this._openedBy = 'keyboard';
      this.openMenu();
    }
  }

  @HostListener('click', ['$event'])
  _handleClick(event: MouseEvent): void {
    if (this.triggersSubmenu()) {
      event.stopPropagation();
      this.openMenu();
    } else {
      this.toggleMenu();
    }
  }

  private _handleHover() {
    if (!this.triggersSubmenu() || !this._parentMaterialMenu) {
      return;
    }

    this._hoverSubscription = this._parentMaterialMenu
      ._hovered()
      .pipe(
        filter(
          (active) => active === this._menuItemInstance && !active.disabled,
        ),
        delay(0, asapScheduler),
      )
      .subscribe(() => {
        this._openedBy = 'mouse';

        if (this.menu instanceof MenuBaseDirective && this.menu._isAnimating) {
          if (!this._parentMaterialMenu) {
            throw new Error('this._parentMaterialMenu is undefined');
          }

          this.menu._animationDone
            .pipe(
              take(1),
              delay(0, asapScheduler),
              takeUntil(this._parentMaterialMenu._hovered()),
            )
            .subscribe(() => this.openMenu());
        } else {
          this.openMenu();
        }
      });
  }

  private _getPortal(): TemplatePortal {
    if (!this._portal || this._portal.templateRef !== this.menu.templateRef) {
      this._portal = new TemplatePortal(
        this.menu.templateRef,
        this._viewContainerRef,
      );
    }

    return this._portal;
  }
}

@Directive({
  selector: '[uikitCommonMenuTriggerFor]',
})
export class MenuTriggerDirective extends MenuTriggerBase {}
