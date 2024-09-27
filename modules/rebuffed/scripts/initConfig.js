export function initConfig() {
  game.settings.register("rebuffed", "rebuffed-enabled", {
    name: "REBUFFED.enabled",
    hint: "REBUFFED.enabledHint",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.registerMenu("rebuffed", "rebuffed-settings", {
    name: "REBUFFED.config",
    label: "REBUFFED.configTitle",
    hint: "REBUFFED.configHint",
    icon: "fas fa-repeat",
    type: RebuffedConfig,
  });
}
