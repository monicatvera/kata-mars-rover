export type Direction = 'north' | 'south' | 'east' | 'west'

export type Command = 'forward' | 'backward'

export type RoverStartInput = Coordinates & {
    direction: Direction
}

export type Coordinates = {
    x: number
    y: number
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

    get x() { return this.#x }
    get y() { return this.#y }

    receiveCommands(commands: Command[]) {
        const commandMap: Record<Command, () => Coordinates> = {
            forward: () => {
                const movement = movementForwardMap[this.#direction]
                return movement({x: this.#x, y: this.#y})

            },
            backward: () => {
                const movement = movementBackwardMap[this.#direction]
                return movement({x: this.#x, y: this.#y})
            }
        }

        commands.forEach(command => {
            const newCoordinates = commandMap[command]()
            this.setCoordinates(newCoordinates)
        })
    }

    private setCoordinates({x, y}: Coordinates){
        this.#x = x
        this.#y = y
    }
}