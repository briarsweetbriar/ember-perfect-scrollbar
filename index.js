/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

function getParentApp(app) {
  if (typeof app.import !== 'function' && app.app) {
    return getParentApp(app.app);
  } else {
    return app;
  }
}

module.exports = {
  name: 'ember-perfect-scrollbar',

  treeForVendor: function(){
    var _this = this;

    var treeify = function treeify(name) {
      var treePath = path.dirname(require.resolve(name));
      return pickFiles(_this.treeGenerator(treePath), {
        srcDir: '/',
        destDir: name
      });
    }

    return mergeTrees([
      treeify('perfect-scrollbar')
    ]);
  },

  included: function(app) {
    this._super.included(app);

    this.eachAddonInvoke('safeIncluded', [app]);

    app = getParentApp(app);

    app.import('vendor/perfect-scrollbar/dist/js/perfect-scrollbar.min.js');
    app.import('vendor/perfect-scrollbar/dist/css/perfect-scrollbar.min.css');
  },

  safeIncluded: function(app, parent) {
    this.included(app, parent);
  }
};
