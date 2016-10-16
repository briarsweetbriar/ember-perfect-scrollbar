/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

function findRoot(current) {
  var app;

  // Keep iterating upward until we don't have a grandparent.
  // Has to do this grandparent check because at some point we hit the project.
  do {
    app = current.app || app;
  } while (current.parent && current.parent.parent && (current = current.parent));

  return app;
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

  treeForAddon: function(app) {
    var app = findRoot(this);

    app.import('vendor/perfect-scrollbar/dist/js/perfect-scrollbar.min.js');
    app.import('vendor/perfect-scrollbar/dist/css/perfect-scrollbar.min.css');

    return this._super.treeForAddon.apply(this, arguments);
  }
};
