export const cardTypes = {
  strike: { name: 'Удар', icon: '⚔️' },
  shield: { name: 'Щит', icon: '🛡️' },
}

export const cards = [
  { name: 'Искра', element: 'fire', type: 'strike', cost: 0, power: 2 },
  { name: 'Огненный удар', element: 'fire', type: 'strike', cost: 1, power: 5 },
  { name: 'Огненный удар', element: 'fire', type: 'strike', cost: 1, power: 5 },
  { name: 'Пламя', element: 'fire', type: 'strike', cost: 2, power: 9 },
  { name: 'Извержение', element: 'fire', type: 'strike', cost: 3, power: 14 },
  { name: 'Тлеющий щит', element: 'fire', type: 'shield', cost: 0, power: 3 },
  { name: 'Огненная стена', element: 'fire', type: 'shield', cost: 1, power: 6 },

  { name: 'Капля', element: 'water', type: 'strike', cost: 0, power: 2 },
  { name: 'Водный удар', element: 'water', type: 'strike', cost: 1, power: 5 },
  { name: 'Водный удар', element: 'water', type: 'strike', cost: 1, power: 5 },
  { name: 'Волна', element: 'water', type: 'strike', cost: 2, power: 9 },
  { name: 'Цунами', element: 'water', type: 'strike', cost: 3, power: 14 },
  { name: 'Пена', element: 'water', type: 'shield', cost: 0, power: 3 },
  { name: 'Ледяная стена', element: 'water', type: 'shield', cost: 1, power: 6 },

  { name: 'Шип', element: 'nature', type: 'strike', cost: 0, power: 2 },
  { name: 'Удар лозой', element: 'nature', type: 'strike', cost: 1, power: 5 },
  { name: 'Удар лозой', element: 'nature', type: 'strike', cost: 1, power: 5 },
  { name: 'Терновник', element: 'nature', type: 'strike', cost: 2, power: 9 },
  { name: 'Гнев леса', element: 'nature', type: 'strike', cost: 3, power: 14 },
  { name: 'Листва', element: 'nature', type: 'shield', cost: 0, power: 3 },
  { name: 'Кора', element: 'nature', type: 'shield', cost: 1, power: 6 },
]

