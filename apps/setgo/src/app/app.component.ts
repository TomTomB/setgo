import { ChangeDetectionStrategy, Component } from '@angular/core';

import versionFile from '../../../../git-version.json';

@Component({
  selector: 'setgo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = versionFile;
}
