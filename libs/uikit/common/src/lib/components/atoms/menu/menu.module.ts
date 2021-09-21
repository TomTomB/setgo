import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  MENU_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MenuTriggerDirective,
} from './menu-trigger';
import { MenuComponent } from './menu';
import { MenuContentDirective } from './menu-content';
import { MenuItemComponent } from './menu-item';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [CommonModule, OverlayModule],
  exports: [
    CdkScrollableModule,
    MenuComponent,
    MenuContentDirective,
    MenuItemComponent,
    MenuTriggerDirective,
  ],
  declarations: [
    MenuComponent,
    MenuContentDirective,
    MenuItemComponent,
    MenuTriggerDirective,
  ],
  providers: [MENU_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class MenuModule {}
