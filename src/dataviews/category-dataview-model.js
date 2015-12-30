var $ = require('jquery');
var DataviewModelBase = require('./dataview-model-base');

module.exports = DataviewModelBase.extend({

  searchCategories: function (options) {
    var url = this.get('url') + '/search?q=' + encodeURIComponent(options.q);
    $.ajax(url, {
      success: options.success,
      error: options.error
    });
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
  },

  _paramsForDataQueryFromOptions: function (options) {
    return {
      bbox: options.boundingBox,
      own_filter: options.ownFilter
    };
  }
});
