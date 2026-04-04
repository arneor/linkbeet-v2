const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo so Metro sees shared packages
config.watchFolders = [monorepoRoot];

// 2. Let Metro know where to resolve packages from (local first, then root)
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// NOTE: Do NOT set disableHierarchicalLookup = true in a pnpm monorepo.
// pnpm uses a virtual store (node_modules/.pnpm) and requires hierarchical
// lookup so Metro can follow symlinks through the virtual store correctly.

module.exports = config;
