import { config } from './config.js'
import { waves } from './mobs.js'

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
