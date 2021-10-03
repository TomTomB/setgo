import { createGlobalStyle } from 'styled-components';

export const Typo = createGlobalStyle`

body {
  font-family: 'Raleway', Arial, Helvetica, sans-serif;
  color : ${({ theme }) => theme.color.text[1]};
}

@supports (font-variation-settings: normal) {
  body {
    font-family: 'Raleway VF', Arial, Helvetica, sans-serif;
  }
}

h1 {
  font-size: 1.875rem;
  line-height: 2.25rem;
  letter-spacing: 0.05em;
  font-weight: 900;
}

h2 {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

h3 {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

a {
}

p {
  max-width: 65ch;
}

`;
