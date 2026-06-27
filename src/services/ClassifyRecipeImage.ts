const CUISINE_EMOJI: Record<string, string> = {
  Italian: "🍝",
  Indian: "🍛",
  Chinese: "🥢",
  Korean: "🍜",
  Any: "🍽️",
};
export const getPlaceholderEmoji = (tagList: { name: string }[]) => {
  for (const cuisine of ["Chinese", "Korean", "Italian", "Indian"]) {
    if (tagList.some((t) => t.name === cuisine)) {
        return CUISINE_EMOJI[cuisine];
    }
  }
  return CUISINE_EMOJI["Any"];
};
