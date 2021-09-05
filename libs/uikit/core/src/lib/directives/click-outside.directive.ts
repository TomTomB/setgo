import {Directive, ElementRef, EventEmitter, HostListener, Input, Output,} from '@angular/core';

@Directive({
  selector: '[uikitCoreClickOutside]',
})
export class ClickOutsideDirective {
  @Input() clickOutsideIgnoreList?: string[];

  @Output() clickOutside: EventEmitter<MouseEvent> = new EventEmitter();

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    const eventTarget = event.target;
    if (this.clickOutsideIgnoreList && eventTarget !== null) {
      if (this.clickOutsideIgnoreList.some(
              (id) => id === (eventTarget as HTMLElement).id,
              ))
        return;
    }

    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit(event);
    }
  }

  constructor(private elementRef: ElementRef) {}
}
