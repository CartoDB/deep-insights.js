var _ = require('underscore');

var WidgetModelFactory = function (types) {
  types = types || {};
  this.types = {};
  for (var type in types) {
    var createModel = types[type];
    this.addType(type, createModel);
  }
};

WidgetModelFactory.prototype.addType = function (type, createModel) {
  if (!_.isString(type)) throw new Error('type must be a string or a function');
  if (!_.isFunction(createModel)) throw new Error('createModel must be a function');
  this.types[type] = createModel;
};

WidgetModelFactory.prototype.createModel = function (attrs, options) {
  if (!attrs.id) throw new Error('attrs.id is required');

  var createModel = this.types[attrs.type];
  if (createModel) {
    var opts = {
      layer: options.layer,
      dataview: options.dataview
    };
    return createModel(attrs, opts);
  } else {
    throw new Error('no model found for arguments ' + arguments);
  }
};

module.exports = WidgetModelFactory;
