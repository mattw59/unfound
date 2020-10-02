export const hello = () => 'Hello world!'; 

export interface World {
    tiles : Array<Array<Tile>>;
    getTiles(): Array<Array<Tile>>;
}

export class BuiltWorld implements World {
    tiles = Array<Array<Tile>>();
    
    constructor(rows : number, cols : number) {

    }

    getTiles() {
        return null;
    }
}

export class Tile {

}