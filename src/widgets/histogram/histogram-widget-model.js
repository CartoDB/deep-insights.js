var WidgetModel = require('../widget-model');
var AutoStylerFactory = require('../auto-style/factory');
var _ = require('underscore');

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
      } else {
        this.autoStyler.set('palette', null);
      }
    }, this);
    this.dataviewModel.layer.bind('change:meta', function (model, style) {
      var ramp = style.match(/\[\s*?.*?[><=]\s*?\d*?\s*?\]\s*?\{\s*?.*?:\s*?#.*?;\s*?}/g);
      if (ramp.length > 1) {
        var bounds = ramp.map(function (el) {
          return {
            color: el.match(/#....../g)[0],
            upper_value: parseInt(el.match(/>.*?]/g)[0].replace(']', '').replace('>', ''), 10)
          };
        });
        this.autoStyler.set('palette', bounds);
      }
    });
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
    this.autoStyler.set('palette', null);
    this.set('autoStyle', false);
  },

  getState: function () {
    var state = WidgetModel.prototype.getState.call(this);
    var start = this.dataviewModel.get('start');
    var end = this.dataviewModel.get('end');
    var min = this.get('min');
    var max = this.get('max');
    var checkRoughEqual = function (a, b) {
      if (_.isNumber(a) && _.isNumber(b) && Math.abs(a - b) > Math.abs(start - end) * 0.01) {
        return true;
      }
      return false;
    };
    if (checkRoughEqual(start, min)) {
      state.min = min;
    }
    if (checkRoughEqual(end, max)) {
      state.max = max;
    }
    return state;
  }

});
