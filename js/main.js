import { showScreen } from './screens.js'
import { startGame, getState } from './game.js'
import { renderHud } from './ui-board.js'

const playButton = document.querySelector('#play-button')
const restartButton = document.querySelector('#restart-button')
const menuButton = document.querySelector('#menu-button')

const render = () => {
  const state = getState()

  renderHud(state)
}

const startNewGame = () => {
  startGame()
  render()
  showScreen('game')
}

playButton.addEventListener('click', startNewGame)
restartButton.addEventListener('click', startNewGame)
menuButton.addEventListener('click', () => showScreen('menu'))
