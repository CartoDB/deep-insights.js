var $ = require('jquery');
var cdb = require('cartodb.js');

module.exports = cdb.core.Model.extend({
  initialize: function () {
    this.bind('change:url', function () {
      this.trigger('dataChanged');
    }, this);
  },

  getData: function (options) {
    var url = this._getURL(options);
    $.ajax(url, {
      success: function (data) {
        options.success && options.success(data);
      },
      error: options.error
    });
  },

  _getURL: function (options) {
    var paramsObject = this._paramsForDataQueryFromOptions(options);
    return this.get('url') + '?' + $.param(paramsObject);
  },

  _paramsForDataQueryFromOptions: function (options) {
    throw new Error('subclasses of dataview-model-base must implement _paramsForDataQueryFromOptions');
  },

  toJSON: function () {
    throw new Error('subclasses of dataview-model-base must implement toJSON');
  }
});
