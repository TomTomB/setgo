const { readFileSync, writeFileSync } = require('fs');

const baseConfigPath = 'apps/setgo/ngsw-config.base.json';
const generatedConfigPath = 'apps/setgo/ngsw-config.json';
const gitVersionPath = 'git-version.json';

const baseConfig = readFileSync(baseConfigPath, { encoding: 'utf-8' });
const gitVersion = readFileSync(gitVersionPath, { encoding: 'utf-8' });

const jsonConfig = JSON.parse(baseConfig);
const gitVersionData = JSON.parse(gitVersion);

jsonConfig.appData.update.version = gitVersionData;

writeFileSync(generatedConfigPath, JSON.stringify(jsonConfig));
