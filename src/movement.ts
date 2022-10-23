import { Command, Coordinates } from "./types"

import { Direction } from "./direction"
import { Planet } from "./Rover"
import { UnionToArray } from "./helpers/union"

export type MovementCommand = '⬆' | '⬇'

export function isMovementCommand(command: Command): command is MovementCommand {
    const movementCommands: UnionToArray<MovementCommand> = ['⬆', '⬇']
    return (movementCommands as Command[]).includes(command)
}

const movementForwardMap: Record<Direction, (_: Coordinates) => Coordinates> = {
    north: ({x, y}) => ({x, y: y + 1}),
    south: ({x, y}) => ({x, y: y - 1}),
    east:  ({x, y}) => ({x: x + 1, y}),
    west:  ({x, y}) => ({x: x - 1, y}),
}

const movementBackwardMap: Record<Direction, (_: Coordinates) => Coordinates> = {
    north: ({x, y}) => ({x, y: y - 1}),
    south: ({x, y}) => ({x, y: y + 1}),
    east:  ({x, y}) => ({x: x - 1, y}),
    west:  ({x, y}) => ({x: x + 1, y}),
}

export const movementCommandMap: Record<MovementCommand, ({x, y}: Coordinates, direction: Direction, planet: Planet | undefined) => Coordinates> = {
    ['⬆']: ({x, y}, direction, planet) => {
        const expected = movementForwardMap[direction]({ x, y })
        return validateMapEdges(expected, planet)
    },
    ['⬇']: ({x, y}, direction, planet) => {
        const expected = movementBackwardMap[direction]({ x, y })
        return validateMapEdges(expected, planet)
    }
}


function validateMapEdges(expectedCoordinates: Coordinates, planet: Planet | undefined): Coordinates {
    if(!planet) return expectedCoordinates

    let { x, y } = expectedCoordinates

    if (x < 0) { x = planet.size }
    if (y < 0) { y = planet.size }
    if (x > planet.size) { x = 0 }
    if (y > planet.size) { y = 0 }

    return { x,y }
}