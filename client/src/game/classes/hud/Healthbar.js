import Text from './Text.js'

const HealthOperations = {
    INC: 0,
    DEC:1,
    SET: 2
}

export class Health extends Text {
    constructor(scene, x,y, health=100 ){
        super(scene, x,y, `Health: ${health}`);
        scene.add.existing(this);
        this.newHealth = health;
    }

    changeHealth(operation, value){
        switch(operation){
            case HealthOperations.INC :
                this.newHealth += value;
                break;
            case HealthOperations.DEC:
                this.newHealth -= value;
                break;
            case HealthOperations.SET :
                this.newHealth = value;
                break;
            default:
                break;
        }
        this.setBar(`Health: ${this.health}`);
    }
    getHealth(){
        return this.health;
    }
}

export default Health