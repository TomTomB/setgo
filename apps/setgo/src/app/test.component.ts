import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'setgo-test',
  template: `<p>Test</p>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {}
