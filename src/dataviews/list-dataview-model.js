var DataviewModelBase = require('./dataview-model-base');

module.exports = DataviewModelBase.extend({
  toJSON: function () {
    return {
      type: 'list',
      options: {
        columns: this.get('columns')
      }
    };
  },

  _paramsForDataQueryFromOptions: function (options) {
    return {
      bbox: options.boundingBox
    };
  }
});
