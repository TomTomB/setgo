import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[uikit-common-button-cta]',
  templateUrl: './button-cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonCTAComponent implements OnChanges {
  @Input()
  isLoading?: boolean | null;

  @Input()
  isDisabled?: boolean | null;

  @Input()
  assertLoadingMessage = 'Loading, please wait...';

  @Input()
  rounded: 'both' | 'bottom' | 'top' = 'both';

  @HostBinding('attr.aria-disabled')
  get value() {
    return this.isLoading || this.isDisabled;
  }

  @HostBinding('class')
  classes = `
    block
    group
    after:transition-opacity
    after:absolute
    after:opacity-0
    after:top-0
    after:left-0
    after:w-full
    dark:ring-white
    ring-black
    after:h-full
    after:bg-gradient-to-r
    after:from-brand-primary-light-dark
    after:to-brand-primary-light
    dark:after:from-brand-primary-dark-dark dark:after:to-brand-primary-dark
    active:after:opacity-100
    hover:before:opacity-100
    focus-visible:before:opacity-100
    outline-none
    focus-visible:ring-2
    transition
    tracking-wider
    uppercase
    before:transition-opacity
    overflow-hidden
    font-bold
    relative
    before:absolute
    before:opacity-0
    before:top-0
    before:left-0
    before:w-full
    before:h-full
    before:bg-gradient-to-r
    before:from-brand-primary-light-dark
    before:via-brand-primary-light
    before:to-brand-primary-light
    dark:before:from-brand-primary-dark-dark
    dark:before:via-brand-primary-dark
    dark:before:to-brand-primary-dark-light
    bg-gradient-to-r
    from-brand-primary-light-dark
    via-brand-primary-light
    to-brand-primary-light-dark
    dark:from-brand-primary-dark-dark
    dark:via-brand-primary-dark
    dark:to-brand-primary-dark-dark
    w-full
    py-4
    px-3
  `;

  constructor(private _elementRef: ElementRef<HTMLDivElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    this._updateClasses(changes);
  }

  private _updateClasses(changes: SimpleChanges) {
    const disabledOrLoadingClasses =
      'after:!opacity-0 before:!opacity-0 cursor-default';

    if (changes.isLoading?.currentValue || changes.isDisabled?.currentValue) {
      this._elementRef.nativeElement.classList.add(
        ...disabledOrLoadingClasses.split(' '),
      );
    } else {
      this._elementRef.nativeElement.classList.remove(
        ...disabledOrLoadingClasses.split(' '),
      );
    }

    const roundedXl = 'rounded-xl';
    const roundedTXl = 'rounded-t-xl';
    const roundedBXl = 'rounded-b-xl';

    const roundedChange = changes.rounded?.currentValue;

    if (roundedChange) {
      switch (roundedChange) {
        case 'both':
          this._elementRef.nativeElement.classList.add(roundedXl);
          this._elementRef.nativeElement.classList.remove(
            roundedTXl,
            roundedBXl,
          );
          break;
        case 'top':
          this._elementRef.nativeElement.classList.add(roundedTXl);
          this._elementRef.nativeElement.classList.remove(
            roundedXl,
            roundedBXl,
          );
          break;
        case 'bottom':
          this._elementRef.nativeElement.classList.add(roundedBXl);
          this._elementRef.nativeElement.classList.remove(
            roundedXl,
            roundedTXl,
          );
          break;
      }
    }
  }
}
