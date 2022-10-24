import { Coordinates, MovementCommand, Planet } from "./types"

import { Direction } from "./direction"

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
        const moveAttempt = movementForwardMap[direction]({ x, y })
        return validateMapEdges(moveAttempt, planet)
    },
    ['⬇']: ({x, y}, direction, planet) => {
        const moveAttempt = movementBackwardMap[direction]({ x, y })
        return validateMapEdges(moveAttempt, planet)
    }
}


function validateMapEdges(moveAttempt: Coordinates, planet: Planet | undefined): Coordinates {
    if (!planet) return moveAttempt

    let { x, y } = moveAttempt

    if (x < 0) { x = planet.size }
    if (y < 0) { y = planet.size }
    if (x > planet.size) { x = 0 }
    if (y > planet.size) { y = 0 }

    return { x,y }
}