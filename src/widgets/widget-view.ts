import cdb from 'cartodb.js';
import * as WidgetLoaderView from './widget-loader-view';
import * as WidgetErrorView from './widget-error-view';

/**
 * Default widget view
 * The model is a expected to be widget model
 */

class WidgetView extends cdb.core.View {
  get className(): string {
    return 'CDB-Widget CDB-Widget--light';
  }

  options: {
    columns_title: string[],
    contentView: any,
  }

  initialize = () => {
    this.listenTo(this.model, 'destroy', this.clean);
  }

  render = () => {
    var dataviewModel = this.model.dataviewModel;
    if (dataviewModel) {
      this._appendView(new WidgetLoaderView({
        model: dataviewModel
      }));

      this._appendView(new WidgetErrorView({
        model: dataviewModel
      }));
    }

    this._appendView(this.options.contentView);
    return this;
  }

  _appendView = (view) => {
    this.$el.append(view.render().el);
    this.addView(view);
  }
}
