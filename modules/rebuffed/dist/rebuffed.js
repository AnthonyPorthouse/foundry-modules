const i = "0.1.0";
class a extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: game.i18n.localize("REBUFFED.configTitle"),
      id: "rebuffed-config",
      template: "modules/rebuffed/templates/rebuffed-config.html",
      width: 650,
      height: "auto",
      closeOnSubmit: !0,
    });
  }
}
Hooks.once("init", async () => {
  console.log("[REBUFFED]", `Launching Rebuffed v${i}`),
    game.settings.register("rebuffed", "rebuffed-enabled", {
      name: "REBUFFED.enabled",
      hint: "REBUFFED.enabledHint",
      scope: "client",
      type: Boolean,
      default: !0,
      config: !0,
    }),
    game.settings.registerMenu("rebuffed", "rebuffed-settings", {
      name: "REBUFFED.config",
      label: "REBUFFED.configTitle",
      hint: "REBUFFED.configHint",
      icon: "fas fa-repeat",
      type: a,
    });
});
Hooks.once("ready", async () => {
  console.log("[REBUFFED]", "Launched Rebuffed");
});
const c = ["Shield", "Courageous Anthem"],
  r = async (n) => {
    if (!game.settings.get("rebuffed", "rebuffed-enabled")) {
      console.log("[REBUFFED]", "Currently disabled");
      return;
    }
    const o = n.combatant,
      l = game.users.current;
    if (!o) return;
    const e = o.actor;
    if (e && e.getUserLevel(l) === CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
      console.log("[REBUFFED]", "Current Combatant", e.name, e);
      for (const s of e.spellcasting.collections) {
        console.debug("[REBUFFED]", "spell collection", s);
        for (const t of s.entry.spells)
          console.log("[REBUFFED]", "spell", t),
            c.includes(t.name) &&
              (console.log("[REBUFFED]", "Found wanted spell"),
              ui.notifications.info(
                await TextEditor.enrichHTML(
                  `Don't forget to cast @UUID[${t.uuid}]{${t.name}}`,
                ),
              ));
      }
    }
  };
Hooks.on("combatTurnChange", r);
//# sourceMappingURL=rebuffed.js.map
