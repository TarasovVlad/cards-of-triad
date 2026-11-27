import { config } from './config.js'
import { cards } from './cards.js'
import { createDeck, drawCards, discardCard, discardHand } from './deck.js'
import { createWave, waves } from './mobs.js'
import { calculateDamage, isTriadMove, getNextTriadChain } from './rules.js'

let state = null

export const getState = () => state

const fillTable = () => {
  while (state.table.length < config.tableSize && state.queue.length > 0) {
    state.table.push(state.queue.shift())
  }
}

const isWaveCleared = () => state.table.length === 0 && state.queue.length === 0

const isLastWave = () => state.waveIndex === waves.length - 1

const updateStatus = () => {
  if (state.health === 0) {
    state.status = 'lost'
  } else if (isWaveCleared() && isLastWave()) {
    state.status = 'won'
  }
}

const startNextWave = () => {
  if (!isWaveCleared() || isLastWave()) {
    return
  }

  state.waveIndex += 1
  state.queue = createWave(state.waveIndex)
}

const startTurn = () => {
  state.turn += 1
  state.energy = config.energyPerTurn
  state.armor = 0
  state.triadChain = []
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
    triadChain: [],
    status: 'playing',
  }

  fillTable()
  startTurn()
}

const findCardInHand = (cardId) => state.deck.hand.find((card) => card.id === cardId)

const findMobOnTable = (mobId) => state.table.find((mob) => mob.id === mobId)

const getCardPower = (card) => {
  const isTriad = isTriadMove(state.triadChain, card.element)

  return isTriad ? card.power * config.triadMultiplier : card.power
}

const spendCard = (card) => {
  state.energy -= card.cost
  state.selectedCardId = null
  state.triadChain = getNextTriadChain(state.triadChain, card.element)
  discardCard(state.deck, card.id)
}

const playShield = (card) => {
  state.armor += getCardPower(card)
  spendCard(card)
}

export const useCard = (cardId) => {
  const card = findCardInHand(cardId)

  if (!card || card.cost > state.energy) {
    return
  }

  if (card.type === 'shield') {
    playShield(card)
    return
  }

  state.selectedCardId = state.selectedCardId === cardId ? null : cardId
}

export const getDamagePreview = (mob) => {
  const card = findCardInHand(state.selectedCardId)

  if (!card) {
    return null
  }

  return calculateDamage(getCardPower(card), card.element, mob.element)
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
  updateStatus()

  return { damage, isKilled: mob.health === 0 }
}

export const endTurn = () => {
  const incomingDamage = state.table.reduce((sum, mob) => sum + mob.attack, 0)
  const blockedDamage = Math.min(state.armor, incomingDamage)
  const takenDamage = incomingDamage - blockedDamage

  state.health = Math.max(0, state.health - takenDamage)
  state.selectedCardId = null
  discardHand(state.deck)
  updateStatus()

  if (state.status === 'playing') {
    startNextWave()
    fillTable()
    startTurn()
  }

  return { takenDamage, blockedDamage }
}
