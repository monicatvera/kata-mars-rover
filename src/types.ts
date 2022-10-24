export type MovementCommand = '⬆' | '⬇'
export type DirectionCommand = '⬅' | '➡'

export type Command = MovementCommand | DirectionCommand
export type Coordinates = { x: number, y: number }
export type CommandsResult = 'success' | { detectedObstacle: Coordinates }
export type Planet = { size: number, obstacles?: Array<Coordinates> }