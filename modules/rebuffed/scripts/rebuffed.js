import { version } from "../package.json";
import { initConfig } from "./initConfig";
import { log, updateTextNode } from "./utils";

Hooks.once("init", async () => {
  log(`Launching Rebuffed v${version}`);

  initConfig();
});

Hooks.once("ready", async () => {
  log("Launched Rebuffed");
});

const wantedSpells = Object.freeze(["Shield", "Courageous Anthem"]);

const onCombatUpdate = async (combat) => {
  if (!game.settings.get("rebuffed", "rebuffed-enabled")) {
    log("Currently disabled");

    return;
  }

  const combatant = combat.combatant;
  const currentUser = game.users.current;

  if (!combatant) {
    return;
  }

  const actor = combatant.actor;

  if (!actor) {
    return;
  }

  if (
    actor.getUserLevel(currentUser) !== CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER
  ) {
    return;
  }

  log("Current Combatant", actor.name, actor);

  for (const collection of actor.spellcasting.collections) {
    for (const spell of collection.entry.spells) {
      if (spell.getFlag("rebuffed", "hasReminder")) {
        log("Found wanted spell", spell.name);
        ui.notifications.info(
          await TextEditor.enrichHTML(
            `Don't forget to cast @UUID[${spell.uuid}]{${spell.name}}`,
          ),
        );
      }
    }
  }
};

Hooks.on("combatTurnChange", onCombatUpdate);

Hooks.on("getSpellSheetPF2eHeaderButtons", async (application, buttons) => {
  const { object } = application;

  let button = {
    class: `remind-${object.id}`,
    icon: "fas fa-star",
    label: object.getFlag("rebuffed", "hasReminder")
      ? "Remove Reminder"
      : "Remind",
    onclick: () => {
      if (object.getFlag("rebuffed", "hasReminder")) {
        updateTextNode(`.remind-${object.id}`, "Remind");

        object.unsetFlag("rebuffed", "hasReminder");
      } else {
        updateTextNode(`.remind-${object.id}`, "Remove Reminder");

        object.setFlag("rebuffed", "hasReminder", true);
      }
    },
  };

  buttons.unshift(button);
});
