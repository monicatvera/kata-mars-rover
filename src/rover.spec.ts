import { Rover } from "./rover";

describe("when rover is placed", () => {
    it('should be able to move forward', () => {
        const rover = new Rover({x: 0, y: 0, direction: 'north'});
        rover.receiveCommands(['forward'])
        expect(rover.x).toBe(0)
        expect(rover.y).toBe(1)
    })

    it('should be able to move backward', () => {
        const rover = new Rover({x: 0, y: 0, direction: 'north'});
        rover.receiveCommands(['backward', 'backward'])
        expect(rover.x).toBe(0)
        expect(rover.y).toBe(-2)
    })

    it('should be able to move forward and backward', () => {
        const rover = new Rover({x: 5, y: 5, direction: 'south'});
        rover.receiveCommands(['forward', 'forward', 'backward', 'forward'])
        expect(rover.x).toBe(5)
        expect(rover.y).toBe(3)
    })


    it('should be able to change direction', () => {
        const rover = new Rover({x: 0, y: 0, direction: 'north'});
            //    30     
            //    21     
        rover.receiveCommands([
            'backward',
            'turnleft',
            'forward',
            'turnright',
            'forward'
        ])

        expect(rover.x).toBe(-1)
        expect(rover.y).toBe(0)
    })
})