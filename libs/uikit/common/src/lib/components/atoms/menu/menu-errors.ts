export function throwMatMenuMissingError() {
  throw Error(`matMenuTriggerFor: must pass in an mat-menu instance.
    Example:
      <mat-menu #menu="matMenu"></mat-menu>
      <button [matMenuTriggerFor]="menu"></button>`);
}

export function throwMatMenuInvalidPositionX() {
  throw Error(`xPosition value must be either 'before' or after'.
      Example: <mat-menu xPosition="before" #menu="matMenu"></mat-menu>`);
}

export function throwMatMenuInvalidPositionY() {
  throw Error(`yPosition value must be either 'above' or below'.
      Example: <mat-menu yPosition="above" #menu="matMenu"></mat-menu>`);
}

export function throwMatMenuRecursiveError() {
  throw Error(
    `matMenuTriggerFor: menu cannot contain its own trigger. Assign a menu that is ` +
      `not a parent of the trigger or move the trigger outside of the menu.`,
  );
}
