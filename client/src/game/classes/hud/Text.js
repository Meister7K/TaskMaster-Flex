import Phaser, {GameObjects}from 'phaser';
export class Text extends GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, {
      fontSize: 'calc(100dvi / 50)',
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4,
    });
    this.setOrigin(0.5, 0.5);
    scene.add.existing(this);
  }
}
export default Text