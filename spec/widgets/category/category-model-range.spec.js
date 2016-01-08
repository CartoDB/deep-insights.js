var Backbone = require('backbone');
var CategoryModelRange = require('../../../src/widgets/category/models/category-model-range');

describe('src/widgets/category/category-model-range', function () {
  describe('.getCategoriesCount', function () {
    it('should invoke the callback with the counts', function () {
      var dataview = new Backbone.Model();
      dataview.getData = function (options) {
        options.success({
          'count': 9999999,
          'nulls': 0,
          'min': 1,
          'max': 769,
          'categoriesCount': 888888,
          'categories': [
            {
              'category': 'USA',
              'value': 769,
              'agg': false
            },
            {
              'category': 'RUS',
              'value': 578,
              'agg': false
            },
            {
              'category': 'CHN',
              'value': 400,
              'agg': false
            },
            {
              'category': 'BRA',
              'value': 392,
              'agg': false
            },
            {
              'category': 'CAN',
              'value': 255,
              'agg': false
            },
            {
              'category': 'Other',
              'value': 4926,
              'agg': true
            }
          ],
          'type': 'aggregation'
        });
      };

      var model = new CategoryModelRange({}, {
        dataview: dataview
      });

      var successCallback = jasmine.createSpy('successCallback');

      model.getCategoriesCount({
        success: successCallback
      });

      expect(successCallback).toHaveBeenCalledWith({
        categoriesCount: 888888,
        totalCount: 9999999
      });
    });
  });
});
