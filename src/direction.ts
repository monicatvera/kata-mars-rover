import { DirectionCommand } from "./types"

export type Direction = 'north' | 'south' | 'east' | 'west'

const directionClockwise: Record<Direction, Direction> = {
    north: "east",
    south: "west",
    east: "south",
    west: "north"
}

const directionCounterClockwise: Record<Direction, Direction> = {
    north: "west",
    south: "east",
    east: "north",
    west: "south"
}

export const directionMap: Record<DirectionCommand, (direction: Direction) => Direction> = {
    ['⬅']: direction => directionCounterClockwise[direction],
    ['➡']: direction => directionClockwise[direction]
}