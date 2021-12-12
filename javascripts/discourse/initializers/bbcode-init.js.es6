import {withPluginApi} from 'discourse/lib/plugin-api';

export default {
  name: 'bbcode-init',
  initialize (container) {
    withPluginApi ('0.8.40', api => {
      api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "color_ui_button",
          group: "extras",
          icon: "palette",
          perform: e => e.applySurround('[wrap=colorme color=#]', '[/wrap]', 'color_ui_default_text')
        });
      });
    })
  }}
