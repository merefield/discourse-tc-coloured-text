import {withPluginApi} from 'discourse/lib/plugin-api';

export default {
  name: 'bbcode-init',
  initialize (container) {
    withPluginApi ('0.8.40', api => {
      const hasAlpha = /(.,){3}|\//;
      const MAX_LENGTH = 25;

      const getVariable = value => {
        const color = value.replace(/\s/g, "");
        return hasAlpha.test(color) || color.length > MAX_LENGTH ? "" : color;
      };

      api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "color_ui_button",
          group: "extras",
          icon: "palette",
          title: themePrefix('composer.color_ui_button_title'),
          perform: e => e.applySurround('[color=red]', '[/color]', 'my_text_in_red')
        });
      });
    })
  }
}
