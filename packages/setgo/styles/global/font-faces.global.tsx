import { createGlobalStyle } from 'styled-components';

export const FontFaces = createGlobalStyle`

@font-face {
  font-family: 'Raleway VF';
  font-style: normal;
  font-display: swap;
  src: url('/fonts/raleway/variable/WOFF2/Raleway-VF.woff2')
      format('woff2-variations'),
    url('/fonts/raleway/variable/WOFF2/Raleway-VF.woff2') format('woff2');
}

@font-face {
  font-family: 'Raleway VF';
  font-style: italic;
  font-display: swap;
  src: url('/fonts/raleway/variable/WOFF2/Raleway-Italic-VF.woff2')
      format('woff2-variations'),
    url('/fonts/raleway/variable/WOFF2/Raleway-Italic-VF.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Raleway-Thin'), local('RalewayThin'),
    url('/fonts/raleway/static/WOFF2/Raleway-Thin.woff2') format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: local('Raleway-ExtraLight'), local('RalewayExtraLight'),
    url('/fonts/raleway/static/WOFF2/Raleway-ExtraLight.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Raleway-Light'), local('RalewayLight'),
    url('/fonts/raleway/static/WOFF2/Raleway-Light.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Raleway-Regular'), local('RalewayRegular'),
    url('/fonts/raleway/static/WOFF2/Raleway-Regular.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Raleway-Medium'), local('RalewayMedium'),
    url('/fonts/raleway/static/WOFF2/Raleway-Medium.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: local('Raleway-SemiBold'), local('RalewaySemiBold'),
    url('/fonts/raleway/static/WOFF2/Raleway-SemiBold.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Raleway-Bold'), local('RalewayBold'),
    url('/fonts/raleway/static/WOFF2/Raleway-Bold.woff2') format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: local('Raleway-ExtraBold'), local('RalewayExtraBold'),
    url('/fonts/raleway/static/WOFF2/Raleway-ExtraBold.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Raleway-Black'), local('RalewayBlack'),
    url('/fonts/raleway/static/WOFF2/Raleway-Black.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Raleway-ThinItalic'), local('RalewayThinItalic'),
    url('/fonts/raleway/static/WOFF2/Raleway-ThinItalic.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 200;
  font-display: swap;
  src: local('Raleway-ExtraLightItalic'), local('RalewayExtraLightItalic'),
    url('/fonts/raleway/static/WOFF2/Raleway-ExtraLightItalic.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Raleway-LightItalic'), local('RalewayLightItalic'),
    url('/fonts/raleway/static/WOFF2/Raleway-LightItalic.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Raleway-Italic'), local('RalewayItalic'),
    url('/fonts/raleway/static/WOFF2/Raleway-Italic.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Raleway-MediumItalic'), local('RalewayMediumItalic'),
    url('/fonts/raleway/static/WOFF2/Raleway-MediumItalic.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 600;
  font-display: swap;
  src: local('Raleway-SemiBoldItalic'), local('RalewaySemiBoldItalic'),
    url('/fonts/raleway/static/WOFF2/Raleway-SemiBoldItalic.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Raleway-BoldItalic'), local('RalewayBoldItalic'),
    url('/fonts/raleway/static/WOFF2/Raleway-BoldItalic.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 800;
  font-display: swap;
  src: local('Raleway-ExtraBoldItalic'), local('RalewayExtraBoldItalic'),
    url('/fonts/raleway/static/WOFF2/Raleway-ExtraBoldItalic.woff2')
      format('woff2');
}

@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Raleway-BlackItalic'), local('RalewayBlackItalic'),
    url('/fonts/raleway/static/WOFF2/Raleway-BlackItalic.woff2')
      format('woff2');
}
`;
