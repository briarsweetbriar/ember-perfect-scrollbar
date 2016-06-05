import Ember from 'ember';

const {
  Mixin,
  get,
  isPresent
} = Ember;

export default Mixin.create({
  perfectScrollbarOptions: {},

  init(...args) {
    this._super(...args);

    const resizeService = get(this, 'resizeService');

    if (isPresent(resizeService)) {
      resizeService.on('debouncedDidResize', () => {
        this._resizePerfectScrollbar();
      });
    }
  },

  _resizePerfectScrollbar() {
    PerfectScrollbar.update(this.element);
  },

  didInsertElement(...args) {
    this._super(...args);

    PerfectScrollbar.initialize(this.element, get(this, 'perfectScrollbarOptions'));
  },

  willDestroyElement(...args) {
    this._super(...args);

    PerfectScrollbar.destroy(this.element);
  }
});
