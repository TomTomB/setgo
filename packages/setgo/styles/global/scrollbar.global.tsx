import { createGlobalStyle } from 'styled-components';

export const Scrollbar = createGlobalStyle`

@media (min-width: 768px) and (pointer: fine) {
  ::-webkit-scrollbar {
    width: 11px;
    background-color: transparent;
    height: 11px;
  }

  ::-webkit-scrollbar-track-piece {
    background: transparent;
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  ::-webkit-resizer {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border: 3px solid transparent;
    border-radius: 6px;
    background-clip: padding-box;
    height: 11px;
    background-color: ${({ theme }) => (theme.isDark ? 'gray' : 'darkgray')}  ;

    &:hover {
      background-color: ${({ theme }) =>
        theme.isDark ? 'lightgray' : 'lightgray'} ;
    }

    &:active {
      background-color: ${({ theme }) => (theme.isDark ? 'darkgray' : 'gray')} ;
    }
  }
}

`;
