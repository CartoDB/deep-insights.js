var _ = require('underscore');
var WidgetModel = require('../widget-model');

module.exports = WidgetModel.extend({
  defaults: _.extend(
    {},
    WidgetModel.prototype.defaults,
    {
      data: '',
      suffix: '',
      prefix: ''
    }
  ),

  _optionsForDataviewQuery: function () {
    return {
      boundingBox: this.get('boundingBox')
    };
  },

  // TODO: The response format has probably changed
  parse: function (r) {
    return {
      data: r.result,
      nulls: r.nulls
    };
  }

});
