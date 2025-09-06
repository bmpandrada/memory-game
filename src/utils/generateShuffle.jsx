export const generateShuffledCards = (initialCards) => {
  const duplicated = [...initialCards, ...initialCards];
  return duplicated.map((card, index) => ({
    id: index + 1,
    value: card.value,
    isFlipped: false,
    isMatched: false,
    isHovered: false,
  })).sort(() => Math.random() - 0.5);
};