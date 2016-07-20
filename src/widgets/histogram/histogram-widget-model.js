var WidgetModel = require('../widget-model');
var AutoStylerFactory = require('../auto-style/factory');
var _ = require('underscore');
var d3 = require('d3');

/**
 * Model for a histogram widget
 */
module.exports = WidgetModel.extend({
  defaults: {
    normalized: true
  },

  defaultState: _.extend(
    {
      autoStyle: false,
      normalized: false
    },
    WidgetModel.prototype.defaultState
  ),

  initialize: function (attrs, opts) {
    WidgetModel.prototype.initialize.apply(this, arguments);
    this.autoStyler = AutoStylerFactory.get(this.dataviewModel);
    this.on('change:collapsed', this._onCollapsedChange, this);
    this.dataviewModel.once('change', function () {
      if (this.get('autoStyle')) {
        this.autoStyle();
      }
    }, this);
  },

  _onCollapsedChange: function (m, isCollapsed) {
    this.dataviewModel.set('enabled', !isCollapsed);
  },

  autoStyle: function () {
    var layer = this.dataviewModel.layer;
    if (!layer.get('initialStyle')) {
      var initialStyle = layer.get('cartocss');
      if (!initialStyle && layer.get('meta')) {
        initialStyle = layer.get('meta').cartocss;
      }
      layer.set('initialStyle', initialStyle);
    }
    var style = this.autoStyler.getStyle();
    this.dataviewModel.layer.set('cartocss', style);
    this.set('autoStyle', true);
  },

  cancelAutoStyle: function () {
    this.dataviewModel.layer.restoreCartoCSS();
    this.set('autoStyle', false);
  },

  getState: function () {
    var state = WidgetModel.prototype.getState.call(this);
    var min = this.get('lo_index');
    var max = this.get('hi_index');
    if (_.isNumber(min) || _.isNumber(max)) {
      var scale = d3.scale.linear().domain([0, this.dataviewModel.get('bins')]).range([this.dataviewModel.get('start'), this.dataviewModel.get('end')]);
      var lo = scale(min);
      var hi = scale(max);
      if (lo) {
        state.min = lo;
        if (!hi) {
          state.max = scale(this.get('bins') - 1);
        } else {
          state.max = hi;
        }
      } else if (hi) {
        state.max = hi;
        state.min = scale(0);
      }
    }
    return state;
  }

});
