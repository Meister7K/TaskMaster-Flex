

const createPlayerAnimations = (anims)=>{

    anims.create({
        key: "warrior1FrontAnimation",
        frames: anims.generateFrameNames('player1', {start:0,end:13, prefix: 'warrior1FrontAnimation',suffix:'.png'}),
        frameRate: 16,
        repeat: -1,
      });
  
      anims.create({
        key: "warrior1BackAnimation",
        frames: [
          { key: "warrior1back", frame: 0 },
          { key: "warrior1back", frame: 1 },
          { key: "warrior1back", frame: 2 },
          { key: "warrior1back", frame: 3 },
          { key: "warrior1back", frame: 4 },
          { key: "warrior1back", frame: 5 },
          { key: "warrior1back", frame: 6 },
          { key: "warrior1back", frame: 7 },
          { key: "warrior1back", frame: 8 },
          { key: "warrior1back", frame: 9 },
          { key: "warrior1back", frame: 10 },
          { key: "warrior1back", frame: 11 },
          { key: "warrior1back", frame: 12 },
          { key: "warrior1back", frame: 13 },
        ],
        frameRate: 16,
        repeat: -1,
      });
  
      anims.create({
        key: "warrior1LeftAnimation",
        frames: [
          { key: "warrior1left", frame: 0 },
          { key: "warrior1left", frame: 1 },
          { key: "warrior1left", frame: 2 },
          { key: "warrior1left", frame: 3 },
          { key: "warrior1left", frame: 4 },
          { key: "warrior1left", frame: 5 },
          { key: "warrior1left", frame: 6 },
          { key: "warrior1left", frame: 7 },
          { key: "warrior1left", frame: 8 },
          { key: "warrior1left", frame: 9 },
          { key: "warrior1left", frame: 10 },
          { key: "warrior1left", frame: 11 },
          { key: "warrior1left", frame: 12 },
          { key: "warrior1left", frame: 13 },
        ],
        frameRate: 16,
        repeat: -1,
      });
  
      anims.create({
        key: "warrior1RightAnimation",
        frames: [
          { key: "warrior1right", frame: 0 },
          { key: "warrior1right", frame: 1 },
          { key: "warrior1right", frame: 2 },
          { key: "warrior1right", frame: 3 },
          { key: "warrior1right", frame: 4 },
          { key: "warrior1right", frame: 5 },
          { key: "warrior1right", frame: 6 },
          { key: "warrior1right", frame: 7 },
          { key: "warrior1right", frame: 8 },
          { key: "warrior1right", frame: 9 },
          { key: "warrior1right", frame: 10 },
          { key: "warrior1right", frame: 11 },
          { key: "warrior1right", frame: 12 },
          { key: "warrior1right", frame: 13 },
        ],
        frameRate: 16,
        repeat: -1,
      });
  
      anims.create({
        key: "warrior0FrontAnimation",
        frames: [
          { key: "warrior0front", frame: 0 },
          { key: "warrior0front", frame: 1 },
          { key: "warrior0front", frame: 2 },
          { key: "warrior0front", frame: 3 },
          { key: "warrior0front", frame: 4 },
          { key: "warrior0front", frame: 5 },
          { key: "warrior0front", frame: 6 },
          { key: "warrior0front", frame: 7 },
          { key: "warrior0front", frame: 8 },
          { key: "warrior0front", frame: 9 },
          { key: "warrior0front", frame: 10 },
          { key: "warrior0front", frame: 11 },
          { key: "warrior0front", frame: 12 },
          { key: "warrior0front", frame: 13 },
        ],
        frameRate: 16,
        repeat: -1,
      });
  
      anims.create({
        key: "warrior0BackAnimation",
        frames: [
          { key: "warrior0back", frame: 0 },
          { key: "warrior0back", frame: 1 },
          { key: "warrior0back", frame: 2 },
          { key: "warrior0back", frame: 3 },
          { key: "warrior0back", frame: 4 },
          { key: "warrior0back", frame: 5 },
          { key: "warrior0back", frame: 6 },
          { key: "warrior0back", frame: 7 },
          { key: "warrior0back", frame: 8 },
          { key: "warrior0back", frame: 9 },
          { key: "warrior0back", frame: 10 },
          { key: "warrior0back", frame: 11 },
          { key: "warrior0back", frame: 12 },
          { key: "warrior0back", frame: 13 },
        ],
        frameRate: 16,
        repeat: -1,
      });
  
      anims.create({
        key: "warrior0LeftAnimation",
        frames: [
          { key: "warrior0left", frame: 0 },
          { key: "warrior0left", frame: 1 },
          { key: "warrior0left", frame: 2 },
          { key: "warrior0left", frame: 3 },
          { key: "warrior0left", frame: 4 },
          { key: "warrior0left", frame: 5 },
          { key: "warrior0left", frame: 6 },
          { key: "warrior0left", frame: 7 },
          { key: "warrior0left", frame: 8 },
          { key: "warrior0left", frame: 9 },
          { key: "warrior0left", frame: 10 },
          { key: "warrior0left", frame: 11 },
          { key: "warrior0left", frame: 12 },
          { key: "warrior0left", frame: 13 },
        ],
        frameRate: 16,
        repeat: -1,
      });
  
      anims.create({
        key: "warrior0RightAnimation",
        frames: [
          { key: "warrior0right", frame: 0 },
          { key: "warrior0right", frame: 1 },
          { key: "warrior0right", frame: 2 },
          { key: "warrior0right", frame: 3 },
          { key: "warrior0right", frame: 4 },
          { key: "warrior0right", frame: 5 },
          { key: "warrior0right", frame: 6 },
          { key: "warrior0right", frame: 7 },
          { key: "warrior0right", frame: 8 },
          { key: "warrior0right", frame: 9 },
          { key: "warrior0right", frame: 10 },
          { key: "warrior0right", frame: 11 },
          { key: "warrior0right", frame: 12 },
          { key: "warrior0right", frame: 13 },
        ],
        frameRate: 16,
        repeat: -1,
      });
  


}
export default createPlayerAnimations;