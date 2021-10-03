import { createGlobalStyle } from 'styled-components';

export const Misc = createGlobalStyle`

* {
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

/// TODO (TRB): Remove this once angular fire provides a way to disable this warning
/// See: https://github.com/angular/angularfire/issues/2724
p.firebase-emulator-warning {
 display: none
}

html {
  color-scheme: ${({ theme }) => (theme.isDark ? 'dark' : 'light')};
}

.cdk-visually-hidden, .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

hr{
  border-color: ${({ theme }) => theme.color.border.default};
}

`;
