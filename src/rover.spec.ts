import { Planet, Rover } from "./Rover";

describe("when rover is placed", () => {
    it('should be able to move forward', () => {
        const rover = new Rover({x: 0, y: 0, direction: 'north'});
        rover.receiveCommands(['⬆'])
        expect(rover.isAt).toEqual({x: 0, y: 1})
    })

    it('should be able to move backward', () => {
        const rover = new Rover({x: 0, y: 0, direction: 'north'});
        rover.receiveCommands(['⬇', '⬇'])
        expect(rover.isAt).toEqual({x: 0, y: -2})
    })

    it('should be able to move forward and backward', () => {
        const rover = new Rover({x: 5, y: 5, direction: 'south'});
        rover.receiveCommands(['⬆', '⬆', '⬇', '⬆'])
        expect(rover.isAt).toEqual({x: 5, y: 3})
    })


    it('should be able to change direction', () => {
        const rover = new Rover({x: 0, y: 0, direction: 'north'});
        rover.receiveCommands(['⬇', '⬅', '⬆', '➡', '⬆'])
        expect(rover.isAt).toEqual({x: -1, y: 0})
    })

    describe("on a planet", () => {
        it('should come back after reaching the planet end', () => {
            const mercury: Planet = { size: 10 }
            const rover = new Rover({x: 0, y: 0, direction: 'north', at: mercury })
            rover.receiveCommands(Array(11).fill('⬆'))
            expect(rover.isAt).toEqual({x: 0, y: 0})
        })

        it('should return positive result based on a planet size', () => {
            const mercury: Planet = { size: 10 }
            const rover = new Rover({x: 0, y: 0, direction: 'north', at: mercury })
            rover.receiveCommands(['⬇'])
            expect(rover.isAt).toEqual({x: 0, y: 10})
        })
    })
})