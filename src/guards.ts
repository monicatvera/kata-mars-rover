import { Command, CommandsResult, Coordinates, DirectionCommand, MovementCommand } from "./types"

import { UnionToArray } from "./helpers/union"

export function isDirectionCommand(command: Command): command is DirectionCommand {
    const directionCommands: UnionToArray<DirectionCommand> = ['⬅', '➡']
    return (directionCommands as Command[]).includes(command)
}

export function isMovementCommand(command: Command): command is MovementCommand {
    const movementCommands: UnionToArray<MovementCommand> = ['⬆', '⬇']
    return (movementCommands as Command[]).includes(command)
}

export function isObstaclesReport(report: CommandsResult): report is { detectedObstacle: Coordinates } {
    return report !== 'success' && !!(report as any).detectedObstacle
}