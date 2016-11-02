var _ = require('underscore');

//TODO: put this in a mixin and move to another folder
// Object.prototype.getAttr = function (attr) {
//   if (attr && typeof attr === 'string') {
//     const props = attr.split('.');
//     let currentProp = null;
//
//     for (let i = 0; i < props.length; i++) {
//       let p = props[i];
//
//       if (!currentProp) {
//         currentProp = this[p];
//       } else {
//         currentProp = currentProp[p];
//       }
//
//       if (!currentProp) return;
//     }
//
//     return currentProp;
//   }
// };

_.mixin({
  getAttr: function (attr, obj) {
    if (attr && typeof attr === 'string') {
      const props = attr.split('.');
      let currentProp = null;

      for (let i = 0; i < props.length; i++) {
        let p = props[i];

        if (!currentProp) {
          currentProp = obj[p];
        } else {
          currentProp = currentProp[p];
        }

        if (!currentProp) return;
      }

      return currentProp;
    }
  }
});


var getFrom = function (widgetM) {
  var style = widgetM.get('style');

  var utils = function (style) {
    return {
      getColor: function (st) {
        style = st || style;
        return style && _.getAttr('definition.color.fixed', style);
      }
    };
  };

  return {
    autoStyle: function () {
      var toRet = style ? style.auto_style || {} : {allowed: true};
      var utilsInst = utils(toRet);

      return _.extend(toRet, utilsInst);
    },

    widgetConf: function () {
      var toRet = (style && style.widget_style) || {};
      var utilsInst = utils(toRet);

      return _.extend(toRet, utilsInst);
    }
  };
};

var isActive = function (widgetM) {
  return widgetM.get('autoStyle');
};

var toggleActive = function (widgetM) {
  return widgetM.set('autoStyle', !isActive(widgetM));
};

var isEnabled = function (widgetM) {
  return getFrom(widgetM).autoStyle().allowed;
};

var AutoStyle = {
  isActive: isActive,
  toggleActive: toggleActive,
  isEnabled: isEnabled,
  getFrom: getFrom
};

module.exports = AutoStyle;
