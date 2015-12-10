Package.describe({
  name: 'tapfuse:unified-cronjobs',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

var C = 'client';
var S = 'server';
var CS = [C, S];

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  // Core
  api.use([
    'templating',
    'ecmascript'
    ]);
  // 3rd party
  api.use([
    'percolate:synced-cron@1.3.0'
    ]);

  api.addFiles('lib/tapfuse-unified-cronjobs.js', S);

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('tapfuse:unified-cronjobs');
  api.addFiles('tests/package-tests.js');
});
