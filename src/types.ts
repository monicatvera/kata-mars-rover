import { Direction, DirectionCommand } from "./direction"

import { MovementCommand } from "./movement"

export type Command = MovementCommand | DirectionCommand


export type Coordinates = {
    x: number
    y: number
}