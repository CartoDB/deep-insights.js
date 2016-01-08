var cdb = require('cartodb.js');

/**
 *  This model is used for getting the total amount of values
 *  from the category.
 *
 */
module.exports = cdb.core.Model.extend({
  initialize: function (attrs, options) {
    this._dataview = options.dataview;
  },

  getCategoriesCount: function (options) {
    this._dataview.getData({
      success: function (data) {
        options.success(this._parse(data));
      }.bind(this),
      error: function (error) {
        options.error(error);
      }
    });
  },

  _parse: function (response) {
    return {
      categoriesCount: response.categoriesCount,
      totalCount: response.count
    };
  }
});
