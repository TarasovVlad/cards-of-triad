import { config, elements } from './config.js'
import { waves } from './mobs.js'
import { createElement } from './dom.js'

const mobsElement = document.querySelector('#mobs')
const queueElement = document.querySelector('#mob-queue')

const hud = {
  health: document.querySelector('#player-hp'),
  armor: document.querySelector('#player-armor'),
  energy: document.querySelector('#player-energy'),
  wave: document.querySelector('#wave-number'),
  deck: document.querySelector('#deck-count'),
}

export const renderHud = (state) => {
  hud.health.textContent = state.health
  hud.armor.textContent = state.armor
  hud.energy.textContent = `${state.energy}/${config.energyPerTurn}`
  hud.wave.textContent = `${state.waveIndex + 1}/${waves.length}`
  hud.deck.textContent = state.deck.drawPile.length
}

const createHealthBar = (mob) => {
  const healthBar = createElement('span', 'mob__health-bar')
  const healthFill = createElement('span', 'mob__health-fill')
  healthFill.style.width = `${(mob.health / mob.maxHealth) * 100}%`
  healthBar.append(healthFill)

  return healthBar
}

const createMobElement = (mob, damagePreview) => {
  const mobElement = createElement('button', 'mob')
  mobElement.type = 'button'
  mobElement.dataset.id = mob.id
  mobElement.dataset.element = mob.element
  mobElement.classList.toggle('mob--boss', Boolean(mob.isBoss))

  mobElement.append(
    createElement('span', 'mob__element', elements[mob.element].icon),
    createElement('span', 'mob__name', mob.name),
    createHealthBar(mob),
    createElement('span', 'mob__stats', `❤️ ${mob.health}/${mob.maxHealth}  ⚔️ ${mob.attack}`),
  )

  if (damagePreview !== null) {
    mobElement.classList.add('mob--targetable')
    mobElement.append(createElement('span', 'mob__preview', `−${damagePreview}`))
  }

  return mobElement
}

export const renderMobs = (state, getDamagePreview) => {
  const mobElements = state.table.map((mob) => createMobElement(mob, getDamagePreview(mob)))
  mobsElement.replaceChildren(...mobElements)
}

export const renderQueue = (state) => {
  const queueItems = state.queue.map((mob) => {
    const item = createElement('span', 'queue-mob', elements[mob.element].icon)
    item.dataset.element = mob.element
    item.title = mob.name

    return item
  })

  queueElement.replaceChildren(...queueItems)
}

export const onMobClick = (handler) => {
  mobsElement.addEventListener('click', (event) => {
    const mobElement = event.target.closest('.mob')

    if (mobElement) {
      handler(Number(mobElement.dataset.id))
    }
  })
}
