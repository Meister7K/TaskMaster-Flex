import Text from './Text.js'
//!set import of coins here

const CoinOperations = {
    INC: 0,
    DEC:1,
    SET: 2
}

export class Coins extends Text {
    constructor(scene, x,y, coins){
        super(scene, x,y, `Coins: ${coins}`);
        scene.add.existing(this);
        this.newCoins = coins;
    }

    changeHealth(operation, value){
        switch(operation){
            case CoinOperations.INC :
                this.newCoins += value;
                break;
            case CoinOperations.DEC:
                this.newCoins -= value;
                break;
            case CoinOperations.SET :
                this.newCoins = value;
                break;
            default:
                break;
        }
        this.setCoins(`Coins: ${this.coins}`);
    }
    getCoins(){
        return this.coins;
    }
}

export default Coins