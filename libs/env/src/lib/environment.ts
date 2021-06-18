// HACK: We need to go 3 dirs up from the root dir (src, not src/lib)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import versionFile from '../../../git-version.json';

export const environment = {
  production: false,
  version: versionFile,
};
