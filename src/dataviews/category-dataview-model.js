var _ = require('underscore');
var cdb = require('cartodb.js');

module.exports = cdb.core.Model.extend({

  BOUNDING_BOX_FILTER_WAIT: 500,

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
    var params = [
      ['bbox', options.boundingBox].join('='),
      ['own_filter', options.ownFilter].join('=')
    ].join('&');
    this.url = this.get('url') + '?' + params;
    this.fetch({
      success: function () {
        options.success && options.success(this.get('data'));
      }.bind(this),
      error: options.error
    });
  },

  url: function () {
    throw new Error('use getData to extract data from a dataview');
  },

  parse: function (data) {
    return {
      data: data
    };
  },

  toJSON: function () {
    return {
      type: 'aggregation',
      options: {
        column: this.get('column'),
        aggregation: this.get('aggregation'),
        aggregationColumn: this.get('aggregationColumn')
      }
    };
  }
});
