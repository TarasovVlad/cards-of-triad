const mobTypes = {
  imp: { name: 'Имп', element: 'fire', health: 6, attack: 5 },
  salamander: { name: 'Саламандра', element: 'fire', health: 12, attack: 3 },
  wolf: { name: 'Волк', element: 'nature', health: 10, attack: 3 },
  golem: { name: 'Голем', element: 'nature', health: 22, attack: 2 },
  slime: { name: 'Слизень', element: 'water', health: 16, attack: 2 },
  siren: { name: 'Сирена', element: 'water', health: 7, attack: 6 },
  dragon: { name: 'Дракон Триады', element: 'fire', health: 60, attack: 8, isBoss: true },
}

export const waves = [
  ['wolf', 'imp', 'slime', 'wolf'],
  ['salamander', 'siren', 'golem', 'imp', 'wolf'],
  ['golem', 'siren', 'salamander', 'dragon'],
]

let lastMobId = 0

const createMob = (typeKey) => {
  const mobType = mobTypes[typeKey]
  lastMobId += 1

  return { ...mobType, id: lastMobId, maxHealth: mobType.health }
}

export const createWave = (waveIndex) => waves[waveIndex].map((typeKey) => createMob(typeKey))
