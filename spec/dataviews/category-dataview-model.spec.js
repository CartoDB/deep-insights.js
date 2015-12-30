var CategoryDataviewModel = require('../../src/dataviews/category-dataview-model');

describe('src/dataviews/category-dataview-model', function () {

  describe('.toJSON', function () {
    it('should serialize the dataview', function () {
      var dataview = new CategoryDataviewModel({
        column: 'column',
        aggregation: 'aggregation',
        aggregationColumn: 'aggregationColumn'
      });

      expect(dataview.toJSON()).toEqual({
        type: 'aggregation',
        options: {
          column: 'column',
          aggregation: 'aggregation',
          aggregationColumn: 'aggregationColumn'
        }
      });
    });
  });
});
