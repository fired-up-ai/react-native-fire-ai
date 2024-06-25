// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const repositoryRoot = path.resolve(projectRoot, '../..');
const defaultConfig = getDefaultConfig(projectRoot);
defaultConfig.resolver.sourceExts.push('cjs');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(repositoryRoot);

config.watchFolders = [ repositoryRoot ];
config.resolver.nodeModulesPaths = [
    path.resolve(repositoryRoot, 'node_modules'),
    path.resolve(projectRoot, 'node_modules'),
]

module.exports = config;
