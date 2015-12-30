var DataviewModelBase = require('./dataview-model-base');

module.exports = DataviewModelBase.extend({
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
