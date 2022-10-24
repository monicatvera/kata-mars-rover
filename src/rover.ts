import { Command, CommandsResult, Coordinates, Planet } from "./types"
import { Direction, directionMap } from "./direction"
import { isDirectionCommand, isMovementCommand } from "./guards"

import { movementCommandMap } from "./movement"

type RoverStartInput = Coordinates & { looking: Direction, at?: Planet }
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
                const { x, y } = movementCommandMap[command](
                    { x: this.#x, y: this.#y},
                    this.#direction, this.#planet
                )

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

        return detectedObstacle ? { detectedObstacle } : 'success'
    }

    detectObstacles(x: number, y: number): boolean {
        if (!this.#planet || !this.#planet.obstacles)
            return false

        return this.#planet.obstacles.some(o => o.x === x && o.y === y)
    }
}