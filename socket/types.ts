export interface CharacteristicInfo {
  path: string[]
  listen: boolean,
}

export interface ConnectionInstructions {
  addresses: string[],
  characteristicsInfo: CharacteristicInfo[],
}
