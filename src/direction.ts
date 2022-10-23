import { Command } from "./types"
import { UnionToArray } from "./helpers/union"

export type Direction = 'north' | 'south' | 'east' | 'west'

export type DirectionCommand = 'turnleft' | 'turnright'

export function isDirectionCommand(command: Command): command is DirectionCommand {
    const directionCommands: UnionToArray<DirectionCommand> = ['turnleft', 'turnright']
    return (directionCommands as Command[]).includes(command)
}


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
    turnleft: direction => directionCounterClockwise[direction],
    turnright: direction => directionClockwise[direction]
}