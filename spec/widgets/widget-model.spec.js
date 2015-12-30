var Backbone = require('backbone');
var WidgetModel = require('../../src/widgets/widget-model');

describe('widgets/widget-model', function () {
  beforeEach(function () {
    this.dataview = new Backbone.Model();
    this.dataview.getData = function () {};
    spyOn(this.dataview, 'getData');

    this.model = new WidgetModel({}, {
      dataview: this.dataview
    });
    this.model._optionsForDataviewQuery = function () {
      return { a: 1 };
    };
  });

  it('should bind to the changes on the dataview', function () {
    this.dataview.trigger('dataChanged');
    expect(this.dataview.getData).toHaveBeenCalledWith({
      a: 1,
      success: jasmine.any(Function),
      error: jasmine.any(Function)
    });
  });

  describe('after first load', function () {
    beforeEach(function () {
      this.dataview.getData = function (opts) {};
      spyOn(this.dataview, 'getData');

      this.dataview.trigger('dataChanged');
    });

    it('should not fetch new data when the dataview has new data and sync is disabled', function () {
      expect(this.dataview.getData).toHaveBeenCalled();

      this.model.set('sync', false);

      this.dataview.getData.calls.reset();

      this.dataview.trigger('dataChanged');

      expect(this.dataview.getData).not.toHaveBeenCalled();
    });

    it('should not fetch new data when url changes and widget is collapsed', function () {
      expect(this.dataview.getData).toHaveBeenCalled();

      this.model.set('collapsed', true);

      this.dataview.getData.calls.reset();

      this.dataview.trigger('dataChanged');

      expect(this.dataview.getData).not.toHaveBeenCalled();
    });

    it('should not fetch new data when bbox changes and bbox is not enabled', function () {
      expect(this.dataview.getData).toHaveBeenCalled();

      this.model.set('bbox', false);

      this.dataview.getData.calls.reset();

      this.model.trigger('change:boundingBox', this.model);

      expect(this.dataview.getData).not.toHaveBeenCalled();
    });

    it('should not fetch new data when bbox changes and widget is collapsed', function () {
      this.model.set('collapsed', true);
      spyOn(this.model, 'fetch');
      this.model.trigger('change:boundingBox', this.model);
      expect(this.model.fetch).not.toHaveBeenCalled();
    });
  });

  describe('when collapsed', function () {
    it('should fetch again when collapse is disabled and dataview or boundingBox has changed', function () {
      this.dataview.trigger('dataChanged');

      expect(this.dataview.getData).toHaveBeenCalled();

      this.dataview.getData.calls.reset();

      this.model.set('collapsed', true);

      // While the widget was collapsed, data changed
      this.dataview.trigger('dataChanged');

      this.model.set('collapsed', false);

      expect(this.dataview.getData).toHaveBeenCalled();
    });

    it('should not fetch when collapsed is enabled', function () {
      this.dataview.getData.calls.reset();

      this.model.set('collapsed', true);

      expect(this.dataview.getData).not.toHaveBeenCalled();
    });
  });

  it('should trigger loading event when fetch is launched', function () {
    spyOn(this.model, 'trigger');
    this.model.fetch();
    expect(this.model.trigger).toHaveBeenCalledWith('loading', this.model);
  });
});
