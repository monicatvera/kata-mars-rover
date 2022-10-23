import { Rover } from "./rover";

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
})