var cdb = require('cartodb.js');
var template = require('./time-series-header.tpl');
var d3 = require('d3');

/**
 * View to reset render range.
 */
module.exports = cdb.core.View.extend({
  className: 'CDB-Widget-header--timeSeries js-header CDB-Widget-contentSpaced',
  events: {
    'click .js-clear': '_onClick'
  },

  initialize: function () {
    this._dataviewModel = this.options.dataviewModel;
    this._rangeFilter = this.options.rangeFilter;
    this._rangeFilter.bind('change', this.render, this);
    this._setupScales();
  },

  render: function () {
    this.$el.empty();
    if (!this._rangeFilter.isEmpty()) {
      var start = this._rangeFilter.get('min');
      var end = this._rangeFilter.get('max');
      if (this._dataviewModel.get('column_type') === 'date') {
        start = new Date(this._scale.invert(start));
        end = new Date(this._scale.invert(end));
      }
      this.$el.html(
        template({
          timeAndDateFormatter: this._timeAndDateFormatter,
          startDate: start,
          endDate: end
        })
      );
    }
    return this;
  },

  _setupScales: function () {
    var data = this._dataviewModel.get('data');
    this._scale = d3.time.scale()
      .domain([data[0].start * 1000, data[data.length - 1].end * 1000])
      .nice()
      .range([this._dataviewModel.get('start'), this._dataviewModel.get('end')]);

    // for format rules see https://github.com/mbostock/d3/wiki/Time-Formatting
    this._timeAndDateFormatter = function (time) {
      if (typeof time === 'number') {
        return Math.round(time);
      } else {
        return d3.time.format('%H:%M')(time) + ' ' + d3.time.format('%x')(time);
      }
    };
  },

  _onClick: function () {
    this.trigger('resetFilter', this);
  }
});
