var $ = require('jquery');
var CategoryDataviewModel = require('../../src/dataviews/category-dataview-model');

describe('src/dataviews/category-dataview-model', function () {
  describe('.searchCategories', function () {
    it('should use the dataview to search categories', function () {
      spyOn($, 'ajax');
      var successCallback = function () {};
      var errorCallback = function () {};

      var dataview = new CategoryDataviewModel({
        url: 'http://example.com',
        column: 'column',
        aggregation: 'aggregation',
        aggregationColumn: 'aggregationColumn'
      });

      dataview.searchCategories({
        q: 'search query',
        success: successCallback,
        error: errorCallback
      });

      var ajaxRequest = $.ajax.calls.mostRecent();
      expect(ajaxRequest.args[0]).toEqual('http://example.com/search?q=search%20query');
      expect(ajaxRequest.args[1].success).toEqual(successCallback);
      expect(ajaxRequest.args[1].error).toEqual(errorCallback);
    });
  });

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
