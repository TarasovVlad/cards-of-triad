import { elements } from './config.js'
import { cardTypes } from './cards.js'
import { createElement } from './dom.js'

const handElement = document.querySelector('#hand')

const createCardElement = (card) => {
  const cardElement = createElement('button', 'card')
  cardElement.type = 'button'
  cardElement.dataset.id = card.id
  cardElement.dataset.element = card.element
  cardElement.dataset.type = card.type

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
  const cardElements = state.deck.hand.map((card) => createCardElement(card))
  handElement.replaceChildren(...cardElements)
}
