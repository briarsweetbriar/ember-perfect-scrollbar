[![npm version](https://badge.fury.io/js/ember-perfect-scrollbar.svg)](https://badge.fury.io/js/ember-perfect-scrollbar)
[![Build Status](https://travis-ci.org/null-null-null/ember-perfect-scrollbar.svg?branch=master)](https://travis-ci.org/null-null-null/ember-perfect-scrollbar)

# ember-perfect-scrollbar

Wraps [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar) in an Ember.js mixin which can then be easily applied to any component.

## Installation

`ember install ember-perfect-scrollbar`

## Usage

```js
import Ember from 'ember';
import { PerfectScrollbarMixin } from 'ember-perfect-scrollbar';

export default Ember.Component.extend(PerfectScrollbarMixin, {
  perfectScrollbarOptions: {
    suppressScrollX: true
  },

  . . . .
})
```

You can find valid `perfectScrollbarOptions` in the `perfect-scrollbar` [documentation](https://github.com/noraesae/perfect-scrollbar#optional-parameters).

And once you've set those, you're done! `perfect-scrollbar` will be applied on `didInsertElement` and torn down on `willDestroyElement`.

### `ember-resize`

It also works out-of-the-box with [ember-resize](https://github.com/mike-north/ember-resize). If `ember-resize` is installed, it'll automatically resize the scrollbar if the element is resized. It uses `debouncedDidResize`.

Alternatively, you can trigger a resize on your own by calling `_resizePerfectScrollbar`:

```js
foobar: on('windowResize', function() {
  this._resizePerfectScrollbar()
});
```
