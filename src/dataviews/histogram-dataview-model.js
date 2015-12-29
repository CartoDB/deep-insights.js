var DataviewModelBase = require('./dataview-model-base');

module.exports = DataviewModelBase.extend({

  toJSON: function (d) {
    return {
      type: 'histogram',
      options: {
        column: this.get('column'),
        bins: this.get('bins')
      }
    };
  },

  _paramsForDataQueryFromOptions: function (options) {
    var params = {};

    if (options.columnType) {
      params.column_type = options.columnType;
    }
    if (options.start) {
      params.start = options.start;
    }
    if (options.end) {
      params.end = options.end;
    }
    if (options.bins) {
      params.bins = options.bins;
    }
    if (options.ownFilter) {
      params.own_filter = options.ownFilter;
    }
    if (options.boundingBox) {
      params.bbox = options.boundingBox;
    }

    return params;
  }
});
