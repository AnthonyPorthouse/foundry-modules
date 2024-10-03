function hasCondition(tokenConditions, conditionSlug) {
  return tokenConditions.find((e) => e.slug == conditionSlug);
}

//determines how many actions a token should start with.
export function actionCount(token) {
  let num_actions = 3; //Set the base number of actions to the default 3.
  const conditions = token.actor.conditions.filter((a) => a.active);

  if (
    hasCondition(conditions, "immobilized") ||
    hasCondition(conditions, "paralyzed") ||
    hasCondition(conditions, "petrified") ||
    hasCondition(conditions, "unconscious")
  ) {
    return 0;
  }
  let stunned = hasCondition(conditions, "stunned");
  let slowed = hasCondition(conditions, "slowed");
  let quickened = hasCondition(conditions, "quickened");
  if (stunned || slowed) {
    num_actions -= Math.max(slowed?.value ?? 0, stunned?.value ?? 0);
  }
  if (quickened) {
    num_actions += 1;
  }

  return Math.max(num_actions, 0);
}
