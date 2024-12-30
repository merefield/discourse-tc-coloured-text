import {withPluginApi} from 'discourse/lib/plugin-api';
import I18n from "I18n";

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

      const currentLocale = I18n.currentLocale();

      I18n.translations[currentLocale].js.composer.placeholder_coloured_text = settings.default_text;

      api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "color_ui_button",
          group: "extras",
          icon: "palette",
          title: themePrefix('composer.color_ui_button_title'),
          perform: e => e.applySurround(`[wrap=color color=${settings.default_foreground_colour} bgcolor=${settings.default_background_colour}]`, '[/wrap]', 'placeholder_coloured_text')
        });
      });

      api.decorateCookedElement(
        post => {
          post
            .querySelectorAll("[data-color]")
            .forEach(i =>
              i.style.setProperty("--color", getVariable(i.dataset.color))
            );

          post
            .querySelectorAll("[data-bgcolor]")
            .forEach(i =>
              i.style.setProperty("--bgcolor", getVariable(i.dataset.bgcolor))
            );
        },
        { id: "wrap-colors" }
      );
    })
  }
}
