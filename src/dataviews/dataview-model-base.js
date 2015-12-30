var _ = require('underscore');
var cdb = require('cartodb.js');

module.exports = cdb.core.Model.extend({

  initialize: function () {
    this.bind('change:url', function () {
      this.trigger('dataChanged');
    }, this);
  },

  // TODO: Instead of using Backbone's fetch mechanism, we can use AJAX here
  getData: function (options) {
    this._setURL(options);
    this.fetch({
      success: function () {
        options.success && options.success(this.get('data'));
      }.bind(this),
      error: options.error
    });
  },

  _setURL: function (options) {
    var paramsObject = this._paramsForDataQueryFromOptions(options);
    var queryString = '';
    var params = [];
    for (var key in paramsObject) {
      var value = paramsObject[key];
      params.push([key, value].join('='));
    }
    queryString = params.join('&');

    this.url = this.get('url') + '?' + queryString;
  },

  _paramsForDataQueryFromOptions: function (options) {
    throw new Error('subclasses of dataview-model-base must implement _paramsForDataQueryFromOptions');
  },

  parse: function (data) {
    return {
      data: data
    };
  },

  toJSON: function () {
    throw new Error('subclasses of dataview-model-base must implement toJSON');
  }
});
