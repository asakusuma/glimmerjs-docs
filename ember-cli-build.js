/*jshint node:true*/
/* global require, module, escape */
var GlimmerApp = require('@glimmer/application-pipeline/lib/broccoli/glimmer-app');
var merge = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var fs = require('fs');

function GlimmerDocsApp(defaults, options) {
  GlimmerApp.call(this, defaults, options);
}

GlimmerDocsApp.__proto__ = GlimmerApp;
GlimmerDocsApp.prototype = Object.create(GlimmerApp.prototype);
GlimmerDocsApp.prototype._contentForHead = function(content, config) {
  GlimmerApp.prototype._contentForHead.call(this, content, config);
  var docsContent = fs.readFileSync('./content/docs.json');
  content.push('<meta name="docs-content" ' +
                 'content="' + escape(docsContent) + '" />');
}

module.exports = function(defaults) {
  var app = new GlimmerDocsApp(defaults, {});

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  var contentTree = new Funnel('content', {
    destDir: 'docs'
  });

  return merge([app.toTree(), contentTree]);
};
