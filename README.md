# mithril-j2c

Want to integrate j2c in mithril? Here is how:

## [TLDR;](http://jsfiddle.net/qe805q4q/4/)

```javascript
//- some module -------------------

var styler = require('mithril-j2c');
var m = require('mithril');

var cls = styler.attach({
  '.foo': {
    background: 'blue'
  }
});

function someRandomView() {
  return m('span.' + cls.foo, 'Some random content');
}

function someDynamiclyStlyedView() {
  var cls = styler.liveUpdate({
     '.bar': { background: scope.background }
  });
  return m('span.' + cls.bar, 'Some blinky stuff content');
}

//- main view -------------------

var styler = require('mithril-j2c');
var m = require('mithril');

m.mount(document, {
   controller: function() {
       scope = {
           background: 'red'
       };
       setInterval(function() {
           scope.background = scope.background === 'red' ? 'green' : 'red';
           m.redraw();
       }, 1000);
       return scope;
   },
   view: function(scope) {
       return [
           someRandomView(),
           someDynamiclyStlyedView(scope),
           styler.view()
       ];
   }
});
```

## API

As you see there are three functions

### `attach(j2cStyleDefinition)`

This allows to add a permanent style definition. It returns the result of
`j2c.scoped` which is a object with the css classes as key and the
live-generated css classes as values.

### `liveUpdate(j2cStyleDefinition)`

This allows to add a dynamic style definition. It also returns the result of
`j2c.scoped`, same like `attach`. Difference beween them is that the resulting
css is cleared after redraw. So you have to add this css during every redraw
cycle.

### `view()`

This creates an array containing two vdom nodes, one for the permanent styles
one for the live-update styles. It should be called in the root view of your
application.

