import { elements } from './config.js'
import { cardTypes } from './cards.js'
import { createElement } from './dom.js'
import { isTriadMove } from './rules.js'

const handElement = document.querySelector('#hand')

const createCardElement = (card, state) => {
  const cardElement = createElement('button', 'card')
  cardElement.type = 'button'
  cardElement.dataset.id = card.id
  cardElement.dataset.element = card.element
  cardElement.dataset.type = card.type
  cardElement.disabled = card.cost > state.energy
  cardElement.classList.toggle('card--selected', card.id === state.selectedCardId)
  cardElement.classList.toggle('card--triad', isTriadMove(state.triadChain, card.element))

  cardElement.append(
    createElement('span', 'card__cost', card.cost),
    createElement('span', 'card__element', elements[card.element].icon),
    createElement('span', 'card__name', card.name),
    createElement('span', 'card__type', cardTypes[card.type].name),
    createElement('span', 'card__power', `${cardTypes[card.type].icon} ${card.power}`),
  )

  return cardElement
}

export const renderHand = (state) => {
  const cardElements = state.deck.hand.map((card) => createCardElement(card, state))
  handElement.replaceChildren(...cardElements)
}

export const onCardClick = (handler) => {
  handElement.addEventListener('click', (event) => {
    const cardElement = event.target.closest('.card')

    if (cardElement) {
      handler(Number(cardElement.dataset.id))
    }
  })
}
