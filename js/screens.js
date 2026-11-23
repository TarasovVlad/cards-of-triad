const activeClass = 'screen--active'

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
