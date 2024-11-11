import { version } from "../package.json";
import { initConfig } from "./initConfig";
import { log, updateTextNode } from "./utils";

Hooks.once("init", async () => {
  log(`Launching Rebuffed v${version}`);
  log("Test version");

  initConfig();
});

Hooks.once("ready", async () => {
  log("Launched Rebuffed");
});

const hasReminderSet = (object, userId) =>
  object.getFlag("rebuffed", "hasReminder")[userId] === true;

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
      if (hasReminderSet(spell, currentUser.id)) {
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

  const currentUser = game.user.id;

  let button = {
    class: `remind-${object.id}`,
    icon: "fas fa-star",
    label: hasReminderSet(object, currentUser) ? "Remove Reminder" : "Remind",
    onclick: () => {
      if (hasReminderSet(object, currentUser)) {
        updateTextNode(`.remind-${object.id}`, "Remind");

        object.setFlag("rebuffed", "hasReminder", {
          [`-=${currentUser}`]: null,
        });
      } else {
        updateTextNode(`.remind-${object.id}`, "Remove Reminder");

        object.setFlag("rebuffed", "hasReminder", { [currentUser]: true });
      }
    },
  };

  buttons.unshift(button);
});
