'use strict';

var m = require('mithril');
var j2c = require('j2c');
var styles = '';

var styles = '';
var liveStyles = '';

module.exports = {
  liveUpdate: function(style) {
    var scopedStyle = j2c.sheet(style);
    liveStyles += scopedStyle;
    return scopedStyle;
  },
  attach: function(style) {
    var scopedStyle = j2c.sheet(style);
    styles += scopedStyle;
    return scopedStyle;
  },
  view: function() {
    var el = [
      m('style', styles),
      m('style', liveStyles)
    ];
    liveStyles = '';
    return el;
  }
};
