'use strict';

var m = require('mithril');
var j2c = require('j2c');

var styles = '';
var liveStyles = '';

module.exports = {
  liveUpdate: function() {
    var scopedStyle = j2c.sheet.apply(null, arguments);
    liveStyles += scopedStyle;
    return scopedStyle;
  },
  attach: function() {
    var scopedStyle = j2c.sheet.apply(null, arguments);
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
