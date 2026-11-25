export const config = Object.freeze({
  startHealth: 30,
  energyPerTurn: 3,
  handSize: 5,
  tableSize: 3,
  strongMultiplier: 2,
  weakMultiplier: 0.5,
  triadSize: 3,
  triadMultiplier: 2,
})

export const elements = Object.freeze({
  fire: { name: 'Огонь', icon: '🔥', beats: 'nature' },
  nature: { name: 'Природа', icon: '🌿', beats: 'water' },
  water: { name: 'Вода', icon: '💧', beats: 'fire' },
})
