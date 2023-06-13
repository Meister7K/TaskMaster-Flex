
import Phaser from 'phaser'

class World {
    constructor(){
        
    }

}

export default World

// const map = this.make.tilemap({key: 'map1'});
// const tiles = map.addTilesetImage('hyptosis_tile-art-batch-1','tile1', 32, 32, 0,0);
// //console.log(tileset1);
// console.log(map);
// console.log(map.layers)
//map.createStaticLayer(0, tiles, 0, 0);

// const debugGraphics = this.add.graphics().setAlpha(.5)
// //! use this on actual project 
// map.layers.forEach((layer,index)=>{
//   const newlayer= map.createLayer(layer.name,'hyptosis_tile-art-batch-1',0,0);
//   newlayer.setCollisionByProperty({Collides:true});
// //     // this.physics.createFromTiles(newlayer);
// })


//this.physics.world.createFromTiles(map.layers)

// this.physics.add.collider(this.player,map)
// const layer1 = map.createLayer('Layer1', tileset1,0,0);
// layer1.setCollisionByProperty({Collide:true});
// const layer2 = map.createLayer('Layer2', tileset1,0,0);
// layer2.setCollisionByProperty({Collide:true});
// this.physics.world.setBoundsCollision(layer1);


//this.map.convertTilemapLayer(layer1);

// import startMap from '../game-assets/map-files/test.json'
// import tiles from'../game-assets/map-files/tileSet1.png'

// class Scene1 extends Phaser.Scene {
//   constructor() {
//     super("loadGame");
//   }
//   preload() {
//     this.load.image('tile1', tiles);
//     this.load.tilemapTiledJSON('map1',startMap);
