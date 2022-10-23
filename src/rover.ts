import { Command, Coordinates } from "./types"
import { Direction, directionMap, isDirectionCommand } from "./direction"
import { isMovementCommand, movementCommandMap } from "./movement"

export type Planet = { size: number }

export type RoverStartInput = Coordinates & { direction: Direction, at?: Planet }

export class Rover {
    #x: number
    #y: number
    #direction: Direction
    #planet: Planet | undefined

    constructor({x, y, direction, at}: RoverStartInput)
    {
        this.#x = x
        this.#y = y
        this.#direction = direction
        this.#planet = at
    }

    get isAt(): Coordinates {
        return { x: this.#x, y: this.#y }
    }

    receiveCommands(commands: Command[]) {
        commands.forEach(command => {
            if (isMovementCommand(command)) {
                const { x, y } = movementCommandMap[command]({ x: this.#x, y: this.#y}, this.#direction, this.#planet)

                this.#x = x
                this.#y = y
            } else if (isDirectionCommand(command)) {
                this.#direction = directionMap[command](this.#direction)
            }
        })
    }
}