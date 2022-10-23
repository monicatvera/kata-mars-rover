import { Command, Coordinates } from "./types"
import { Direction, directionMap, isDirectionCommand } from "./direction"
import { isMovementCommand, movementCommandMap } from "./movement"

export type Planet = { size: number, obstacles?: Array<Coordinates> }

export type RoverStartInput = Coordinates & { looking: Direction, at?: Planet }

type CommandsResult = 'success' | { obstacle: Coordinates }
export function isObstaclesReport(report: CommandsResult): report is { obstacle: Coordinates } {
    return report !== 'success' && !!(report as any).obstacle
}

export class Rover {
    #x: number
    #y: number
    #direction: Direction
    #planet: Planet | undefined

    constructor({x, y, looking, at}: RoverStartInput)
    {
        this.#x = x
        this.#y = y
        this.#direction = looking
        this.#planet = at
    }

    get isAt(): Coordinates {
        return { x: this.#x, y: this.#y }
    }

    receiveCommands(commands: Command[]): CommandsResult {
        let detectedObstacle: Coordinates
        commands.forEach(command => {
            if (!!detectedObstacle)
                return
            if (isMovementCommand(command)) {
                const { x, y } = movementCommandMap[command]({ x: this.#x, y: this.#y}, this.#direction, this.#planet)

                if (this.detectObstacles(x, y)) {
                    detectedObstacle = {x, y}
                    return
                }
                
                this.#x = x
                this.#y = y
            } else if (isDirectionCommand(command)) {
                this.#direction = directionMap[command](this.#direction)
            }
        })

        return detectedObstacle ? {obstacle: detectedObstacle} : 'success'
    }

    detectObstacles(x: number, y: number): boolean {
        if (!this.#planet || !this.#planet.obstacles)
            return false

        return this.#planet.obstacles.some(o => o.x === x && o.y === y)
    }
}