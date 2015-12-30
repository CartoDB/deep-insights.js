var FormulaDataviewModel = require('../../src/dataviews/formula-dataview-model');

describe('src/dataviews/formula-dataview-model', function () {
  describe('.toJSON', function () {
    it('should serialize the dataview', function () {
      var dataview = new FormulaDataviewModel({
        column: 'column',
        operation: 'operation'
      });

      expect(dataview.toJSON()).toEqual({
        type: 'formula',
        options: {
          column: 'column',
          operation: 'operation'
        }
      });
    });
  });
});
