import { config } from './config.js'
import { cards } from './cards.js'
import { createDeck, drawCards } from './deck.js'
import { createWave } from './mobs.js'

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
  }

  fillTable()
  startTurn()
}
