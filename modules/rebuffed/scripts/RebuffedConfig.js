export class RebuffedConfig extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: game.i18n.localize("REBUFFED.configTitle"),
      id: "rebuffed-config",
      template: "modules/rebuffed/templates/rebuffed-config.html",
      width: 650,
      height: "auto",
      closeOnSubmit: true,
    });
  }
}
