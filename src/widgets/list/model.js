var Backbone = require('backbone');
var WidgetModel = require('../widget-model');

module.exports = WidgetModel.extend({
  options: {
    page: 0,
    per_page: 100
  },

  initialize: function (attrs, opts) {
    this._data = new Backbone.Collection(this.get('data'));
    WidgetModel.prototype.initialize.call(this, attrs, opts);
  },

  _optionsForDataviewQuery: function () {
    return {
      boundingBox: this.get('boundingBox')
    };
  },

  getData: function () {
    return this._data;
  },

  getSize: function () {
    return this._data.size();
  },

  parse: function (data) {
    var rows = data.rows;
    this._data.reset(rows);
    return {
      data: rows
    };
  }
});
