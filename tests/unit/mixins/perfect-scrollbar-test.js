import Ember from 'ember';
import PerfectScrollbarMixin from 'ember-perfect-scrollbar/mixins/perfect-scrollbar';
import { module, test } from 'qunit';

const { Evented } = Ember;

module('Unit | Mixin | perfect scrollbar');

test('it initializes on PerfectScrollbar on didInsertElement', function(assert) {
  assert.expect(2);

  const element = {};
  const options = {};

  /* jshint ignore:start */
  PerfectScrollbar = {
    initialize(elementArg, optionsArg) {
      assert.equal(elementArg, element, 'passed element as first argument');
      assert.equal(optionsArg, options, 'passed options as second argument');
    }
  };
  /* jshint ignore:end */

  const PerfectScrollbarObject = Ember.Object.extend(PerfectScrollbarMixin);
  const subject = PerfectScrollbarObject.create({
    element,
    perfectScrollbarOptions: options
  });

  subject.didInsertElement();
});

test('it destroys PerfectScrollbar on willDestroyElement', function(assert) {
  assert.expect(1);

  const element = {};

  /* jshint ignore:start */
  PerfectScrollbar = {
    destroy(elementArg) {
      assert.equal(elementArg, element, 'passed element as first argument');
    }
  };
  /* jshint ignore:end */

  const PerfectScrollbarObject = Ember.Object.extend(PerfectScrollbarMixin);
  const subject = PerfectScrollbarObject.create({
    element
  });

  subject.willDestroyElement();
});

test('if resizeService is present, it updates the PerfectScrollbar on debouncedDidResize', function(assert) {
  assert.expect(1);

  const element = {};

  /* jshint ignore:start */
  PerfectScrollbar = {
    update(elementArg) {
      assert.equal(elementArg, element, 'passed element as first argument');
    }
  };
  /* jshint ignore:end */

  const ResizeService = Ember.Object.extend(Evented);
  const resizeService = ResizeService.create();
  const PerfectScrollbarObject = Ember.Object.extend(PerfectScrollbarMixin);

  PerfectScrollbarObject.create({
    element,
    resizeService
  });

  resizeService.trigger('debouncedDidResize');
});
