import { showScreen } from './screens.js'
import { startGame, getState, useCard, attackMob, getDamagePreview } from './game.js'
import { renderHud, renderMobs, renderQueue, onMobClick } from './ui-board.js'
import { renderHand, onCardClick } from './ui-cards.js'

const playButton = document.querySelector('#play-button')
const restartButton = document.querySelector('#restart-button')
const menuButton = document.querySelector('#menu-button')

const render = () => {
  const state = getState()

  renderHud(state)
  renderMobs(state, getDamagePreview)
  renderQueue(state)
  renderHand(state)
}

const startNewGame = () => {
  startGame()
  render()
  showScreen('game')
}

playButton.addEventListener('click', startNewGame)
restartButton.addEventListener('click', startNewGame)
menuButton.addEventListener('click', () => showScreen('menu'))

onCardClick((cardId) => {
  useCard(cardId)
  render()
})

onMobClick((mobId) => {
  attackMob(mobId)
  render()
})
