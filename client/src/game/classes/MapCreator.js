
import Phaser from 'phaser'

class Map {
    constructor(tileKey,tilePath,tilesetKey,mapKey,MapPath){
        this.tileKey = tileKey;
        this.tilePath = tilePath;
        this.tilesetKey = tilesetKey;
        this.mapKey = mapKey;
        this.mapPath = mapPath;
        
    }
    preload(){
        this.load.image(this.tileKey, this.tilePath);
    this.load.tilemapTiledJSON(this.mapKey, this.mapPath);
    }

    create(){
        let map = this.make.tilemap({key: this.mapKey});
        let tiles = map.addTilesetImage(this.tilesetKey, this.tileKey, 32,32,0,0);

        let mapArr = [];
        map.layers.forEach((layer,index)=>{
            let newlayer = map.createLayer(layer.name, this.tilesetKey,0,0);

            mapArr.push(newlayer);
        })
        let blockGroup = [];

        map.objects[0].objects.forEach(obj =>{
            let block = this.physics.add.sprite(obj.x,obj.y,null,null).setVisible(false).setActive(true).setOrigin(0,0);
            block.body.width = obj.width;
            block.body.height = obj.height;
            block.body.setImmovable(true);
            blockGroup.push(block);
        })
    }
}

export default Map

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
