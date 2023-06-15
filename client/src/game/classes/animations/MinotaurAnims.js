

function createMinotaurAnimations(anims){
    anims.create({
        key: "minotaurAnimation",
        frames: [
          { key: "minotaur", frame: 0 },
          { key: "minotaur", frame: 1 },
          { key: "minotaur", frame: 2 },
          { key: "minotaur", frame: 3 },
          { key: "minotaur", frame: 4 },
        ],
        frameRate: 8,
        repeat: -1,
      });
}

export default createMinotaurAnimations;