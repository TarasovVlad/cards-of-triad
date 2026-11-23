import { showScreen } from './screens.js'

const playButton = document.querySelector('#play-button')
const restartButton = document.querySelector('#restart-button')
const menuButton = document.querySelector('#menu-button')

playButton.addEventListener('click', () => showScreen('game'))
restartButton.addEventListener('click', () => showScreen('game'))
menuButton.addEventListener('click', () => showScreen('menu'))
