import { config } from './config.js'
import { cards } from './cards.js'
import { createDeck, drawCards, discardCard } from './deck.js'
import { createWave } from './mobs.js'
import { calculateDamage } from './rules.js'

let state = null

export const getState = () => state

const fillTable = () => {
  while (state.table.length < config.tableSize && state.queue.length > 0) {
    state.table.push(state.queue.shift())
  }
}

const startTurn = () => {
  state.turn += 1
  state.energy = config.energyPerTurn
  state.armor = 0
  drawCards(state.deck, config.handSize)
}

export const startGame = () => {
  state = {
    health: config.startHealth,
    armor: 0,
    energy: 0,
    turn: 0,
    waveIndex: 0,
    deck: createDeck(cards),
    queue: createWave(0),
    table: [],
    selectedCardId: null,
  }

  fillTable()
  startTurn()
}

const findCardInHand = (cardId) => state.deck.hand.find((card) => card.id === cardId)

const findMobOnTable = (mobId) => state.table.find((mob) => mob.id === mobId)

const spendCard = (card) => {
  state.energy -= card.cost
  state.selectedCardId = null
  discardCard(state.deck, card.id)
}

export const useCard = (cardId) => {
  const card = findCardInHand(cardId)

  if (!card || card.cost > state.energy) {
    return
  }

  state.selectedCardId = state.selectedCardId === cardId ? null : cardId
}

export const getDamagePreview = (mob) => {
  const card = findCardInHand(state.selectedCardId)

  if (!card) {
    return null
  }

  return calculateDamage(card.power, card.element, mob.element)
}

export const attackMob = (mobId) => {
  const card = findCardInHand(state.selectedCardId)
  const mob = findMobOnTable(mobId)

  if (!card || !mob) {
    return null
  }

  const damage = getDamagePreview(mob)
  mob.health = Math.max(0, mob.health - damage)
  state.table = state.table.filter((tableMob) => tableMob.health > 0)
  spendCard(card)

  return { damage, isKilled: mob.health === 0 }
}
