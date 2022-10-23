import { Rover } from "./rover";

describe("when rover is placed", () => {
    it('should be able to receive commands', () => {
        const rover = new Rover({x: 0, y: 0, direction: 'north'});
        rover.receiveCommands(['forward'])
        expect(rover.x).toBe(0)
        expect(rover.y).toBe(1)
    })
})