export interface Version {
  dirty: boolean;
  raw: string;
  hash: string;
  distance: number;
  tag: string;
  semver: Semver;
  suffix: string;
  semverString: string;
}

export interface Semver {
  options: Options;
  loose: boolean;
  raw: string;
  major: number;
  minor: number;
  patch: number;
  prerelease: unknown[];
  build: unknown[];
  version: string;
}

export interface Options {
  loose: boolean;
  includePrerelease: boolean;
}
