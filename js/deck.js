export const shuffle = (items) => {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }

  return result
}

export const createDeck = (cards) => {
  const cardsWithIds = cards.map((card, index) => ({ ...card, id: index + 1 }))

  return {
    drawPile: shuffle(cardsWithIds),
    discardPile: [],
    hand: [],
  }
}

const refillDrawPile = (deck) => {
  deck.drawPile = shuffle(deck.discardPile)
  deck.discardPile = []
}

export const drawCards = (deck, count) => {
  for (let i = 0; i < count; i += 1) {
    if (deck.drawPile.length === 0) {
      refillDrawPile(deck)
    }

    if (deck.drawPile.length === 0) {
      return
    }

    deck.hand.push(deck.drawPile.pop())
  }
}

export const discardCard = (deck, cardId) => {
  const card = deck.hand.find((handCard) => handCard.id === cardId)

  deck.hand = deck.hand.filter((handCard) => handCard.id !== cardId)
  deck.discardPile.push(card)
}

export const discardHand = (deck) => {
  deck.discardPile.push(...deck.hand)
  deck.hand = []
}
