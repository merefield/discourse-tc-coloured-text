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
          perform: e => e.applySurround('[wrap=color color=# bgcolor=#]', '[/wrap]', 'color_ui_default_text')
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
