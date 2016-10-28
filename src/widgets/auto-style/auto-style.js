var _ = require('underscore');


//TODO: put this in a mixin and move to another folder
Object.prototype.getAttr = function (attr) {
  if (attr && typeof attr === 'string') {
    const props = attr.split('.');
    let currentProp = null;

    for (let i = 0; i < props.length; i++) {
      let p = props[i];

      if (!currentProp) {
        currentProp = this[p];
      } else {
        currentProp = currentProp[p];
      }

      if (!currentProp) return;
    }

    return currentProp;
  }
};

var colorUtils = {
  getColor: function (style) {
    return style && style.getAttr('definition.color.fixed');
  }
};

var getFrom = function (widgetM) {
  var style = widgetM.get('style');

  return {
    autoStyle: function () {
      var toRet = style ? style.auto_style || {} : {allowed: true};

      return toRet;
    },

    widgetConf: function () {
      return (style && style.widget_style) || {};
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
  isEnabled: isEnabled
};
