var DataviewModelBase = require('./dataview-model-base');

module.exports = DataviewModelBase.extend({

  toJSON: function (d) {
    return {
      type: 'formula',
      options: {
        column: this.get('column'),
        operation: this.get('operation')
      }
    };
  },

  _paramsForDataQueryFromOptions: function (options) {
    return {
      bbox: options.boundingBox
    };
  }
});
