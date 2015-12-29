var _ = require('underscore');
var cdb = require('cartodb.js');

module.exports = cdb.core.Model.extend({

  BOUNDING_BOX_FILTER_WAIT: 500,

  url: function () {
    throw new Error('use getData to extract data from a dataview');
  },

  initialize: function () {
    this.bind('change:url', function () {
      this.trigger('dataChanged');
    }, this);

    // TODO: Perhaps dataviews should hold a reference to the map instead of relying
    // on someone external (dashboard.js) who sets the boundingBox attribute
    var debouncedFetch = _.debounce(this.fetch, this.BOUNDING_BOX_FILTER_WAIT);
    this.bind('change:boundingBox', debouncedFetch, this);
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
    var params = this._paramsForDataQueryFromOptions(options);
    var queryString = '';
    var wadus = [];
    for (var key in params) {
      var value = params[key];
      wadus.push([key, value].join('='));
    }
    queryString = wadus.join('&');

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
