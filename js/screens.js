import { waves } from './mobs.js'

const activeClass = 'screen--active'

const resultTitle = document.querySelector('#result-title')
const resultText = document.querySelector('#result-text')

const screens = {
  menu: document.querySelector('#menu-screen'),
  game: document.querySelector('#game-screen'),
  result: document.querySelector('#result-screen'),
}

export const showScreen = (screenName) => {
  Object.values(screens).forEach((screen) => {
    screen.classList.remove(activeClass)
  })

  screens[screenName].classList.add(activeClass)
}

export const showResult = (state) => {
  if (state.status === 'won') {
    resultTitle.textContent = 'Победа!'
    resultText.textContent = `Все волны пройдены. Ходов: ${state.turn}.`
  } else {
    resultTitle.textContent = 'Поражение'
    resultText.textContent = `Ты пал на волне ${state.waveIndex + 1} из ${waves.length}.`
  }

  showScreen('result')
}
