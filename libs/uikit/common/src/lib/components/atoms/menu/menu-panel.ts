import { Direction } from '@angular/cdk/bidi';
import { EventEmitter, InjectionToken, TemplateRef } from '@angular/core';
import { FocusOrigin } from '@angular/cdk/a11y';
import { MenuContentDirective } from './menu-content';
import { MenuPositionX, MenuPositionY } from './menu-positions';

export const MENU_PANEL = new InjectionToken<MenuPanel>('MENU_PANEL');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface MenuPanel<T = unknown> {
  xPosition: MenuPositionX;
  yPosition: MenuPositionY;
  overlapTrigger: boolean;
  templateRef: TemplateRef<unknown>;
  readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab'>;
  parentMenu?: MenuPanel | undefined;
  direction?: Direction;
  focusFirstItem: (origin?: FocusOrigin) => void;
  resetActiveItem: () => void;
  setPositionClasses?: (x: MenuPositionX, y: MenuPositionY) => void;
  setElevation?(depth: number): void;
  lazyContent?: MenuContentDirective;
  backdropClass?: string;
  overlayPanelClass?: string | string[];
  hasBackdrop?: boolean;
  readonly panelId?: string;
}
