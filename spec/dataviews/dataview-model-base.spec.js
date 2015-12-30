var _ = require('underscore');
var $ = require('jquery');
var DataviewModelBase = require('../../src/dataviews/dataview-model-base');

var MyDataview = DataviewModelBase.extend({
  _paramsForDataQueryFromOptions: function () {
    return {};
  }
});

describe('src/dataviews/dataview-model-base', function () {
  beforeEach(function () {
    this.dataview = new MyDataview();
  });

  it('should trigger a dataChanged event when the url changes', function () {
    var callback = jasmine.createSpy('callback');
    this.dataview.bind('dataChanged', callback);

    this.dataview.set('url', 'whatever');
    expect(callback).toHaveBeenCalled();
  });

  describe('.getData', function () {
    beforeEach(function () {
      this.dataview.set('url', 'http://example.com');
    });

    it('should invoke the success callback', function () {
      spyOn($, 'ajax').and.callFake(function (options) {
        options.success({ some: 'data' });
      });

      var successCallback = jasmine.createSpy('callback');
      var options = {
        success: successCallback
      };

      this.dataview.getData(options);

      expect(successCallback).toHaveBeenCalledWith({ some: 'data' });
    });

    it('should invoke the error callback', function () {
      spyOn($, 'ajax');

      var errorCallback = jasmine.createSpy('callback');
      var options = {
        error: errorCallback
      };

      this.dataview.getData(options);

      // Ajax request failed
      $.ajax.calls.mostRecent().args[0].error('something went wrong!');

      expect(errorCallback).toHaveBeenCalled();
    });

    it('should use _paramsForDataQueryFromOptions to determine the params that will be included in the URL', function () {
      spyOn($, 'ajax');

      var fakeParamsForDataQueryFromOptions = function (options) {
        return _.pick(options, 'option1', 'option2');
      };

      spyOn(this.dataview, '_paramsForDataQueryFromOptions').and.callFake(fakeParamsForDataQueryFromOptions);

      var options = {
        option1: 'option1',
        option2: 'option2',
        option3: 'option3'
      };

      this.dataview.getData(options);

      var fetchURL = $.ajax.calls.mostRecent().args[0].url;
      expect(fetchURL).toEqual('http://example.com?option1=option1&option2=option2');
    });
  });
});
