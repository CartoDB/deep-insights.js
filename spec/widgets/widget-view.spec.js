var _ = require('underscore');
var cdb = require('cartodb.js');
var WidgetModel = require('../../src/widgets/widget-model');
var WidgetView = require('../../src/widgets/widget-view');

describe('widgets/widget-view', function () {
  it('should have 3 subviews, content, loader and error panes', function () {
    var model = new WidgetModel({
      id: 'widget_1',
      options: {
        title: 'Hello widget',
        columns: ['cartodb_id', 'description']
      }
    }, {
      layer: new cdb.core.Model(),
      dataview: new cdb.core.Model()
    });
    var view = new WidgetView({
      model: model,
      contentView: new cdb.core.View()
    });
    view.render();

    expect(_.size(view._subviews)).toBe(3);
  });
});
