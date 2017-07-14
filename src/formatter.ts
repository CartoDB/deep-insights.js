import * as _ from 'underscore';
import * as moment from 'moment';
import d3 from 'd3';

const AGGREGATION_FORMATS = {
  minute: {
    display: 'HH:mm L',
    unit: 'm'
  },
  hour: {
    display: 'HH:mm L',
    unit: 'h'
  },
  day: {
    display: 'Do MMM YYYY',
    unit: 'd'
  },
  week: {
    display: 'Do MMM YYYY',
    unit: 'w'
  },
  month: {
    display: 'MMM YYYY',
    unit: 'M'
  },
  quarter: {
    display: '[Q]Q YYYY',
    unit: 'Q'
  },
  year: {
    display: 'YYYY',
    unit: 'y'
  }
};

class Formatter {
  formatNumber (value: number, unit?: string): string {
    if (value === 0) {
      return '0';
    }

    const format = d3.format('.2s');
    let p = 0;
    const abs_v = Math.abs(value);

    if (value > 1000) {
      return format(value) + (unit ? ' ' + unit : '');
    }

    if (abs_v > 100) {
      p = 0;
    } else if (abs_v > 10) {
      p = 1;
    } else if (abs_v > 1) {
      p = 2;
    } else if (abs_v > 0) {
      p = Math.max(Math.ceil(Math.abs(Math.log(abs_v) / Math.log(10))) + 2, 3);
    }

    let fixedValue = value.toFixed(p);
    var m = fixedValue.match(/(\.0+)$/);
    if (m) {
      fixedValue = fixedValue.replace(m[0], '');
    }

    return fixedValue;
  }

  formatDate (value) {
    return d3.time.format('%Y-%m-%d')(value);
  }

  formatTime (value) {
    return d3.time.format('%H:%M:%S %d/%m/%Y')(value);
  }

  timeFactory (format) {
    return d3.time.format(format);
  }

  formatValue = (value) => {
    if (_.isNumber(value)) {
      return this.formatNumber(value);
    }
    if (_.isDate(value)) {
      return this.formatDate(value);
    }
    return value;
  };

  timestampFactory (aggregation) {
    return function (timestamp) {
      if (!_.has(AGGREGATION_FORMATS, aggregation)) {
        return '-';
      }

      var format = AGGREGATION_FORMATS[aggregation];
      var date = moment.unix(timestamp).utc();
      return date.format(format.display);
    };
  };
};

const instance = new Formatter();

export default instance;
