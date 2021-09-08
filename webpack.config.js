const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: 'shell',
    publicPath: "auto"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, eager: true, requiredVersion: '12.2.4' },
        '@angular/common': { singleton: true, strictVersion: true, eager: true, requiredVersion: '12.2.4' },
        '@angular/router': { singleton: true, strictVersion: true, eager: true, requiredVersion: '12.2.4' },
        ...sharedMappings.getDescriptors()
      },
    }),
  ],
};
