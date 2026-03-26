import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "discourse-i18n";

const HAS_ALPHA = /(.,){3}|\//;
const MAX_COLOR_LENGTH = 25;

function getVariable(value) {
  const color = value.replace(/\s/g, "");

  return HAS_ALPHA.test(color) || color.length > MAX_COLOR_LENGTH ? "" : color;
}

function initializeBbcode(api) {
  const currentLocale = I18n.currentLocale();

  I18n.translations[currentLocale].js.composer.placeholder_coloured_text =
    settings.default_text;

  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "color_ui_button",
      group: "extras",
      icon: "palette",
      title: themePrefix("composer.color_ui_button_title"),
      perform: (event) =>
        event.applySurround(
          `[wrap=color color=${settings.default_foreground_colour} bgcolor=${settings.default_background_colour}]`,
          "[/wrap]",
          "placeholder_coloured_text"
        ),
    });
  });

  api.decorateCookedElement(
    (post) => {
      post
        .querySelectorAll("[data-color]")
        .forEach((element) =>
          element.style.setProperty(
            "--color",
            getVariable(element.dataset.color)
          )
        );

      post
        .querySelectorAll("[data-bgcolor]")
        .forEach((element) =>
          element.style.setProperty(
            "--bgcolor",
            getVariable(element.dataset.bgcolor)
          )
        );
    },
    { id: "wrap-colors" }
  );
}

export default {
  name: "bbcode-init",

  initialize() {
    withPluginApi(initializeBbcode);
  },
};
