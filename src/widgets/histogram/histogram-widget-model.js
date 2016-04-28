var WidgetModel = require('../widget-model');

/**
 * Model for a histogram widget
 */
module.exports = WidgetModel.extend({

  defaultState: _.extend(WidgetModel.defaultState, {
    autoStyle: false,
    lo_index: null,
    hi_index: null,
    normalized: false,
  }),

  initialize: function (attrs, opts) {
    WidgetModel.prototype.initialize.apply(this, arguments);
    this.on('change:collapsed', this._onCollapsedChange, this);
  },

  _onCollapsedChange: function (m, isCollapsed) {
    this.dataviewModel.set('enabled', !isCollapsed);
  }

});
