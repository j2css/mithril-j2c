# mithril-j2c

```
npm install mithril-j2c
```

Want to integrate [j2c](http://j2c.py.gy) in [Mithril](http://mithril.js.org)? Here is how:

## [TLDR;](http://jsfiddle.net/qe805q4q/10/)

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

function someDynamiclyStyledView(scope) {
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
       var scope = {
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
           someDynamiclyStyledView(scope),
           styler.view()
       ];
   }
});
```

## API

As you see there are three functions

### `attach([scope,] j2cStyleDefinition)`

This allows to add a permanent style definition. It returns the result of
`j2c.sheet` which is a object with the css classes as key and the
live-generated css classes as values.

The optional `scope` is an object that holds `name -> localizedName` mappings, usually in the
form of the value of another `j2c.sheet()`, `styler.attach()` or
`styler.livUpdate()` call.

### `liveUpdate([scope,] j2cStyleDefinition)`

This allows to add a dynamic style definition. It also returns the result of
`j2c.sheet`, same like `attach`. Difference between them is that the resulting
css is cleared after redraw. So you have to add this css during every redraw
cycle.

The optional `scope` is an object that holds `name -> localizedName` mappings, usually in the
form of the value of another `j2c.sheet()`, `styler.attach()` or
`styler.livUpdate()` call.

### `view()`

This creates an array containing two vdom nodes, one for the permanent styles
one for the live-update styles. It should be called in the root view of your
application.

