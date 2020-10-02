import { hello, BuiltWorld, World, Tile } from './world';
import { expect } from 'chai';
import 'mocha';

describe('Hello function', function () {

    it('should return hello world', function () {
        const result = hello();
        expect(result).to.equal('Hello world!');
    });

    it('should load state from local storage');
    it('should persist data in local storage');
    it('should init a new random world given a number of rows and columns', function () {
        const rows = 7;
        const cols = 8;
        const world : World = new BuiltWorld(7, 8);
        let tiles = world.getTiles();
        expect(tiles.length).to.equal(rows);
        expect(tiles[0].length).to.equal(cols);        
    });
    it('should maintain a queue of events in the order they are subimtted');
    it('should dequeue and process events after the expected tick time');
    it('should maintain a game-wide tally of resources that is updated as events are processed');

});