var _ = require('underscore');
var cdb = require('cartodb.js');
// var AutoStylerFactory = require('./auto-style/factory');
var AutoStyle = require('./auto-style/auto-style');

module.exports = cdb.core.Model.extend({
  // TODO: check defaults.
  defaults: {
    attrsNames: [],
    show_stats: false
  },

  defaultState: {
    'collapsed': false
  },
  /**
   * Constructor of the widget model base.
   * @param  {Object} attrs [description]
   * @param  {Object} opts  Object with dataviewModel and
   */
  initialize: function (attrs, opts) {
    this.dataviewModel = opts.dataviewModel;

    this._initBindings();
    this._startFeatures(this.dataviewModel);
  },

  _initBindings: function () {
    var on = this.on;

    on('change:collapsed', this._toggleCollapsed, this);
    on('change:style', this.startAutoStyle, this);
  },

  _startFeatures: function (dataviewModel) {
    var layer = dataviewModel.layer;

    this._startAutoStyle(layer, this);
  },

  _toggleCollapsed: function (m, isCollapsed) {
    this.dataviewModel.set('enabled', !isCollapsed);
  },

  _startAutoStyle: function (layer, model) {
    if (!AutoStyle.isEnabled(model)) return;

    if (layer.get('initialStyle')) {
      layer.set('initialStyle', layer.get('cartocss'));
      return true;
    }
  },

  startAutoStyle: function () {
    if (AutoStyle.isEnabled(this) && AutoStyle.isActive(this)) {
      var cartocss = AutoStyle.getCartoCSS(this);
      var layer = this.dataviewModel.layer;

      layer.set('cartocss', cartocss);
      layer.set('autoStyle', true);

      return true;
    }
  },

  stopAutoStyle: function (noRestore) {
    // TODO: should this be done by the caller?
    if (!noRestore) {
      this.dataviewModel.layer.restoreCartoCSS();
    }
    this.set('autoStyle', false);
  },

  getGenAutoStyle: function () {
    var ccss = this.dataviewModel.layer.get('cartocss');

    return {
      definition: AutoStyle.getDefFromCCSS(ccss),
      cartocss: ccss
    };
  },

  setState: function (state) {
    this.set(state);
  },

  getState: function () {
    var state = {};

    for (var key in this.defaultState) {
      var attribute = this.get(key);
      var defaultValue = this.defaultState[key];
      if (typeof defaultValue !== 'undefined' && typeof attribute !== 'undefined' && !_.isEqual(attribute, defaultValue)) {
        state[key] = attribute;
      }
    }

    return state;
  }
});
