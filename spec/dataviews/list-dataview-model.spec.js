var ListDataviewModel = require('../../src/dataviews/list-dataview-model');

describe('src/dataviews/list-dataview-model', function () {
  describe('.toJSON', function () {
    it('should serialize the dataview', function () {
      var dataview = new ListDataviewModel({
        columns: [ 'column1', 'column2' ]
      });

      expect(dataview.toJSON()).toEqual({
        type: 'list',
        options: {
          columns: [ 'column1', 'column2' ]
        }
      });
    });
  });
});
