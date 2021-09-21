import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  DOWN_ARROW,
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
  hasModifierKey,
} from '@angular/cdk/keycodes';
import { Direction } from '@angular/cdk/bidi';
import { FocusKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import { MENU_CONTENT, MenuContentDirective } from './menu-content';
import { MENU_PANEL, MenuPanel } from './menu-panel';
import { MenuItemComponent } from './menu-item';
import { MenuPositionX, MenuPositionY } from './menu-positions';
import { Observable, Subject, Subscription, merge } from 'rxjs';
import { menuAnimations } from './menu-animations';
import { startWith, switchMap, take } from 'rxjs/operators';
import {
  throwMatMenuInvalidPositionX,
  throwMatMenuInvalidPositionY,
} from './menu-errors';

export interface MenuDefaultOptions {
  xPosition: MenuPositionX;
  yPosition: MenuPositionY;
  overlapTrigger: boolean;
  backdropClass: string;
  overlayPanelClass?: string | string[];
  hasBackdrop?: boolean;
}

export const MAT_MENU_DEFAULT_OPTIONS = new InjectionToken<MenuDefaultOptions>(
  'mat-menu-default-options',
  {
    providedIn: 'root',
    factory: MAT_MENU_DEFAULT_OPTIONS_FACTORY,
  },
);

/** @docs-private */
export function MAT_MENU_DEFAULT_OPTIONS_FACTORY(): MenuDefaultOptions {
  return {
    overlapTrigger: false,
    xPosition: 'after',
    yPosition: 'below',
    backdropClass: 'cdk-overlay-transparent-backdrop',
  };
}

let menuPanelUid = 0;

export type MenuCloseReason = void | 'click' | 'keydown' | 'tab';

@Directive()
export class MenuBaseDirective
  implements AfterContentInit, MenuPanel<MenuItemComponent>, OnInit, OnDestroy
{
  static ngAcceptInputType_overlapTrigger: BooleanInput;
  static ngAcceptInputType_hasBackdrop: BooleanInput;

  private _keyManager!: FocusKeyManager<MenuItemComponent>;
  private _xPosition: MenuPositionX = this._defaultOptions.xPosition;
  private _yPosition: MenuPositionY = this._defaultOptions.yPosition;
  private _previousElevation!: string;
  protected _elevationPrefix!: string;
  protected _baseElevation!: number;

  @ContentChildren(MenuItemComponent, { descendants: true })
  _allItems!: QueryList<MenuItemComponent>;

  private _directDescendantItems = new QueryList<MenuItemComponent>();

  private _tabSubscription = Subscription.EMPTY;

  _classList: { [key: string]: boolean } = {};

  _panelAnimationState: 'void' | 'enter' = 'void';

  readonly _animationDone = new Subject<AnimationEvent>();

  _isAnimating!: boolean;

  parentMenu: MenuPanel | undefined;

  direction!: Direction;

  overlayPanelClass: string | string[] =
    this._defaultOptions.overlayPanelClass || '';

  @Input() backdropClass: string = this._defaultOptions.backdropClass;

  @Input('aria-label') ariaLabel!: string;

  @Input('aria-labelledby') ariaLabelledby!: string;

  @Input('aria-describedby') ariaDescribedby!: string;

  @Input()
  get xPosition(): MenuPositionX {
    return this._xPosition;
  }
  set xPosition(value: MenuPositionX) {
    if (value !== 'before' && value !== 'after') {
      throwMatMenuInvalidPositionX();
    }
    this._xPosition = value;
    this.setPositionClasses();
  }

  @Input()
  get yPosition(): MenuPositionY {
    return this._yPosition;
  }
  set yPosition(value: MenuPositionY) {
    if (value !== 'above' && value !== 'below') {
      throwMatMenuInvalidPositionY();
    }
    this._yPosition = value;
    this.setPositionClasses();
  }

  @ViewChild(TemplateRef) templateRef!: TemplateRef<unknown>;

  @ContentChildren(MenuItemComponent, { descendants: false })
  items!: QueryList<MenuItemComponent>;

  @ContentChild(MENU_CONTENT) lazyContent!: MenuContentDirective;

  @Input()
  get overlapTrigger(): boolean {
    return this._overlapTrigger;
  }
  set overlapTrigger(value: boolean) {
    this._overlapTrigger = coerceBooleanProperty(value);
  }
  private _overlapTrigger: boolean = this._defaultOptions.overlapTrigger;

  @Input()
  get hasBackdrop(): boolean | undefined {
    return this._hasBackdrop;
  }
  set hasBackdrop(value: boolean | undefined) {
    this._hasBackdrop = coerceBooleanProperty(value);
  }
  private _hasBackdrop: boolean | undefined = this._defaultOptions.hasBackdrop;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('class')
  set panelClass(classes: string) {
    const previousPanelClass = this._previousPanelClass;

    if (previousPanelClass && previousPanelClass.length) {
      previousPanelClass.split(' ').forEach((className: string) => {
        this._classList[className] = false;
      });
    }

    this._previousPanelClass = classes;

    if (classes && classes.length) {
      classes.split(' ').forEach((className: string) => {
        this._classList[className] = true;
      });

      this._elementRef.nativeElement.className = '';
    }
  }
  private _previousPanelClass!: string;

  @Output() readonly closed: EventEmitter<MenuCloseReason> =
    new EventEmitter<MenuCloseReason>();

  readonly panelId = `mat-menu-panel-${menuPanelUid++}`;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _ngZone: NgZone,
    @Inject(MAT_MENU_DEFAULT_OPTIONS)
    private _defaultOptions: MenuDefaultOptions,
  ) {}

  ngOnInit() {
    this.setPositionClasses();
  }

  ngAfterContentInit() {
    this._updateDirectDescendants();
    this._keyManager = new FocusKeyManager(this._directDescendantItems)
      .withWrap()
      .withTypeAhead()
      .withHomeAndEnd();
    this._tabSubscription = this._keyManager.tabOut.subscribe(() =>
      this.closed.emit('tab'),
    );

    this._directDescendantItems.changes
      .pipe(
        startWith(this._directDescendantItems),
        switchMap((items) =>
          merge(...items.map((item: MenuItemComponent) => item._focused)),
        ),
      )
      .subscribe((focusedItem) =>
        this._keyManager.updateActiveItem(focusedItem as MenuItemComponent),
      );
  }

  ngOnDestroy() {
    this._directDescendantItems.destroy();
    this._tabSubscription.unsubscribe();
    this.closed.complete();
  }

  _hovered(): Observable<MenuItemComponent> {
    const itemChanges = this._directDescendantItems.changes as Observable<
      QueryList<MenuItemComponent>
    >;
    return itemChanges.pipe(
      startWith(this._directDescendantItems),
      switchMap((items) =>
        merge(...items.map((item: MenuItemComponent) => item._hovered)),
      ),
    ) as Observable<MenuItemComponent>;
  }

  _handleKeydown(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    const manager = this._keyManager;

    switch (keyCode) {
      case ESCAPE:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this.closed.emit('keydown');
        }
        break;
      case LEFT_ARROW:
        if (this.parentMenu && this.direction === 'ltr') {
          this.closed.emit('keydown');
        }
        break;
      case RIGHT_ARROW:
        if (this.parentMenu && this.direction === 'rtl') {
          this.closed.emit('keydown');
        }
        break;
      default:
        if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
          manager.setFocusOrigin('keyboard');
        }

        manager.onKeydown(event);
    }
  }

  focusFirstItem(origin: FocusOrigin = 'program'): void {
    if (this.lazyContent) {
      this._ngZone.onStable
        .pipe(take(1))
        .subscribe(() => this._focusFirstItem(origin));
    } else {
      this._focusFirstItem(origin);
    }
  }

  private _focusFirstItem(origin: FocusOrigin) {
    const manager = this._keyManager;

    manager.setFocusOrigin(origin).setFirstItemActive();

    if (!manager.activeItem && this._directDescendantItems.length) {
      let element =
        this._directDescendantItems.first._getHostElement().parentElement;

      while (element) {
        if (element.getAttribute('role') === 'menu') {
          element.focus();
          break;
        } else {
          element = element.parentElement;
        }
      }
    }
  }

  resetActiveItem() {
    this._keyManager.setActiveItem(-1);
  }

  setElevation(depth: number): void {
    const elevation = Math.min(this._baseElevation + depth, 24);
    const newElevation = `${this._elevationPrefix}${elevation}`;
    const customElevation = Object.keys(this._classList).find((className) => {
      return className.startsWith(this._elevationPrefix);
    });

    if (!customElevation || customElevation === this._previousElevation) {
      if (this._previousElevation) {
        this._classList[this._previousElevation] = false;
      }

      this._classList[newElevation] = true;
      this._previousElevation = newElevation;
    }
  }

  setPositionClasses(
    posX: MenuPositionX = this.xPosition,
    posY: MenuPositionY = this.yPosition,
  ) {
    const classes = this._classList;
    classes['mat-menu-before'] = posX === 'before';
    classes['mat-menu-after'] = posX === 'after';
    classes['mat-menu-above'] = posY === 'above';
    classes['mat-menu-below'] = posY === 'below';
  }

  _startAnimation() {
    // @breaking-change 8.0.0 Combine with _resetAnimation.
    this._panelAnimationState = 'enter';
  }

  /** Resets the panel animation to its initial state. */
  _resetAnimation() {
    // @breaking-change 8.0.0 Combine with _startAnimation.
    this._panelAnimationState = 'void';
  }

  _onAnimationDone(event: AnimationEvent) {
    this._animationDone.next(event);
    this._isAnimating = false;
  }

  _onAnimationStart(event: AnimationEvent) {
    this._isAnimating = true;

    if (event.toState === 'enter' && this._keyManager.activeItemIndex === 0) {
      event.element.scrollTop = 0;
    }
  }

  private _updateDirectDescendants() {
    this._allItems.changes
      .pipe(startWith(this._allItems))
      .subscribe((items: QueryList<MenuItemComponent>) => {
        this._directDescendantItems.reset(
          items.filter((item) => item._parentMenu === this),
        );
        this._directDescendantItems.notifyOnChanges();
      });
  }
}

@Component({
  selector: 'uikit-common-menu',
  templateUrl: 'menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.aria-label]': 'null',
    '[attr.aria-labelledby]': 'null',
    '[attr.aria-describedby]': 'null',
  },
  animations: [menuAnimations.transformMenu],
  providers: [{ provide: MENU_PANEL, useExisting: MenuComponent }],
})
export class MenuComponent extends MenuBaseDirective {
  protected override _elevationPrefix = 'mat-elevation-z';
  protected override _baseElevation = 4;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    ngZone: NgZone,
    @Inject(MAT_MENU_DEFAULT_OPTIONS) defaultOptions: MenuDefaultOptions,
  ) {
    super(elementRef, ngZone, defaultOptions);
  }
}
