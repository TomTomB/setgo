const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/setgo',
    '<rootDir>/apps/firebase',
    '<rootDir>/libs/env',
    '<rootDir>/libs/types',
    '<rootDir>/libs/store/auth',
    '<rootDir>/libs/uikit/common',
    '<rootDir>/libs/store/testing',
    '<rootDir>/libs/store/router',
    '<rootDir>/libs/uikit/forms',
  ],
};
