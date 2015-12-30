var HistogramDataviewModel = require('../../src/dataviews/histogram-dataview-model');

describe('src/dataviews/histogram-dataview-model', function () {

  describe('.toJSON', function () {
    it('should serialize the dataview', function () {
      var dataview = new HistogramDataviewModel({
        column: 'column',
        bins: 'bins'
      });

      expect(dataview.toJSON()).toEqual({
        type: 'histogram',
        options: {
          column: 'column',
          bins: 'bins'
        }
      });
    });
  });
});
