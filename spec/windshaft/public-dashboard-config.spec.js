var cdb = require('cartodb.js');
var Backbone = require('backbone');
var PublicDashboardConfig = require('../../src/windshaft/public-dashboard-config');
var HistogramModel = require('../../src/widgets/histogram/model');

describe('windshaft/public-dashboard-config', function () {
  beforeEach(function () {
    this.dataviews = new Backbone.Collection();

    this.cartoDBLayer1 = new cdb.geo.CartoDBLayer({
      id: 'layer1',
      sql: 'sql1',
      cartocss: 'cartoCSS1',
      cartocss_version: '2.0'
    });
    this.dataview1 = new Backbone.Model({
      id: 'widgetId',
      layerId: 'layer1',
      column: 'column1',
      bins: 10
    });
    spyOn(this.dataview1, 'toJSON').and.returnValue('serializedDataview1');
    var widget = new HistogramModel({}, {
      layer: this.cartoDBLayer1,
      dataview: this.dataview1
    });
    this.dataviews.add(this.dataview1);

    this.cartoDBLayer2 = new cdb.geo.CartoDBLayer({
      id: 'layer2',
      sql: 'sql2',
      cartocss: 'cartoCSS2',
      cartocss_version: '2.0'
    });
    this.dataview2 = new Backbone.Model({
      id: 'widgetId2',
      layerId: 'layer2',
      column: 'column2',
      bins: 5
    });
    spyOn(this.dataview2, 'toJSON').and.returnValue('serializedDataview2');
    var widget2 = new HistogramModel({}, {
      layer: this.cartoDBLayer2,
      dataview: this.dataview2
    });
    this.dataviews.add(this.dataview2);
  });

  describe('.generate', function () {
    it('should generate the config', function () {
      var config = PublicDashboardConfig.generate({
        layers: [ this.cartoDBLayer1, this.cartoDBLayer2 ],
        dataviews: this.dataviews
      });

      expect(config).toEqual({
        layers: [
          {
            type: 'cartodb',
            options: {
              sql: 'sql1',
              cartocss: 'cartoCSS1',
              cartocss_version: '2.0',
              interactivity: [ 'cartodb_id' ],
              widgets: {
                widgetId: 'serializedDataview1'
              }
            }
          },
          {
            type: 'cartodb',
            options: {
              sql: 'sql2',
              cartocss: 'cartoCSS2',
              cartocss_version: '2.0',
              interactivity: [ 'cartodb_id' ],
              widgets: {
                widgetId2: 'serializedDataview2'
              }
            }
          }
        ]
      });
    });

    it('should not include hidden layers', function () {
      this.cartoDBLayer1.set('visible', false);

      var config = PublicDashboardConfig.generate({
        dataviews: this.dataviews,
        layers: [ this.cartoDBLayer1, this.cartoDBLayer2 ]
      });

      expect(config).toEqual({
        layers: [
          {
            type: 'cartodb',
            options: {
              sql: 'sql2',
              cartocss: 'cartoCSS2',
              cartocss_version: '2.0',
              interactivity: [ 'cartodb_id' ],
              widgets: {
                widgetId2: 'serializedDataview2'
              }
            }
          }
        ]
      });
    });
  });
});
