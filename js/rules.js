import { config, elements } from './config.js'

export const getElementMultiplier = (attackElement, targetElement) => {
  if (elements[attackElement].beats === targetElement) {
    return config.strongMultiplier
  }

  if (elements[targetElement].beats === attackElement) {
    return config.weakMultiplier
  }

  return 1
}

export const calculateDamage = (power, attackElement, targetElement) => {
  const multiplier = getElementMultiplier(attackElement, targetElement)

  return Math.floor(power * multiplier)
}

export const isTriadMove = (chain, element) =>
  chain.length === config.triadSize - 1 && !chain.includes(element)

export const getNextTriadChain = (chain, element) => {
  if (chain.includes(element)) {
    return [element]
  }

  const nextChain = [...chain, element]

  return nextChain.length === config.triadSize ? [] : nextChain
}
