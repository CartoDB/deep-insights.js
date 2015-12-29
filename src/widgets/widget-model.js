// TODO: Rename to widget-model-base.js
var _ = require('underscore');
var cdb = require('cartodb.js');

/**
 * Default widget model
 */
module.exports = cdb.core.Model.extend({

  defaults: {
    url: '',
    data: [],
    columns: [],
    sync: true,
    bbox: true,
    collapsed: false
  },

  url: function () {
    return this.get('url') + '?bbox=' + this.get('boundingBox');
  },

  initialize: function (attrs, opts) {
    opts = opts || {};

    this.layer = opts.layer;
    this.filter = opts.filter; // optional/might be undefined
    this.dataview = opts.dataview;

    this._initBinds();
  },

  _initBinds: function () {
    this.dataview.once('dataChanged', function () {
      this._fetchDataFromDataview();
      this._onChangeBinds();
    }, this);

    this.dataview.on('error', function () {
      this.trigger('error');
    }, this);

    // Retrigger an event when the filter changes
    if (this.filter) {
      this.filter.bind('change', this._onFilterChanged, this);
    }
  },

  _fetchDataFromDataview: function () {
    var dataviewQueryOptions = this._optionsForDataviewQuery();
    this.dataview.getData(_.extend(dataviewQueryOptions, {
      success: function (data) {
        this.set(this.parse(data));
      }.bind(this),
      error: function () {
        this.trigger('error');
      }.bind(this)
    }));
  },

  parse: function () {
    throw new Error('subclasses of widget-model must implement parse');
  },

  // TODO: Remove this alias and all references to _fetch
  _fetch: function () {
    this._fetchDataFromDataview();
  },

  _optionsForDataviewQuery: function () {
    throw new Error('subclasses of widget-model must implement _optionsForDataviewQuery');
  },

  _onChangeBinds: function () {
    this.dataview.bind('dataChanged', function () {
      if (this.get('sync') && !this.isCollapsed()) {
        this._fetchDataFromDataview();
      }
    }, this);
    this.bind('change:boundingBox', function () {
      if (this.get('bbox') && !this.isCollapsed()) {
        this._fetchDataFromDataview();
      }
    }, this);

    this.bind('change:collapsed', function (mdl, isCollapsed) {
      if (!isCollapsed) {
        if (mdl.changedAttributes(this._previousAttrs)) {
          this._fetchDataFromDataview();
        }
      } else {
        this._previousAttrs = {
          url: this.get('url'),
          boundingBox: this.get('boundingBox')
        };
      }
    }, this);
  },

  refresh: function () {
    this._fetchDataFromDataview();
  },

  isCollapsed: function () {
    return this.get('collapsed');
  },

  toggleCollapsed: function () {
    this.set('collapsed', !this.get('collapsed'));
  },

  _onFilterChanged: function (filter) {
    this.trigger('change:filter', this, filter);
  },

  getData: function () {
    return this.get('data');
  },

  getPreviousData: function () {
    return this.previous('data');
  },

  fetch: function (opts) {
    this.trigger('loading', this);
    return cdb.core.Model.prototype.fetch.call(this, opts);
  },

  toJSON: function () {
    throw new Error('toJSON should be defined for each widget');
  }
});
