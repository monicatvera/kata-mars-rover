import { Command, Coordinates } from "./types"
import { Direction, directionMap, isDirectionCommand } from "./direction"
import { isMovementCommand, movementCommandMap } from "./movement"

type RoverStartInput = Coordinates & { direction: Direction }


export class Rover {
    #x: number
    #y: number
    #direction: Direction

    constructor({x, y, direction}: RoverStartInput)
    {
        this.#x = x
        this.#y = y
        this.#direction = direction
    }

    get isAt(): Coordinates {
        return { x: this.#x, y: this.#y }
    }

    receiveCommands(commands: Command[]) {
        commands.forEach(command => {
            if (isMovementCommand(command)) {
                const {x, y} = movementCommandMap[command]({ x: this.#x, y: this.#y}, this.#direction)

                this.#x = x
                this.#y = y
            } else if (isDirectionCommand(command)) {
                this.#direction = directionMap[command](this.#direction)
            }
        })
    }
}