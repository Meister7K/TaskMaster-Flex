import Phaser from 'phaser';

import Scene1 from './game/scenes/Scene1'
import Scene2 from './game/scenes/Scene2'

const config = {
	type: Phaser.AUTO,
	parent: 'phaser-container',
	backgroundColor: '#282c34',
	scale: {
		mode: Phaser.Scale.ScaleModes.RESIZE,
		width: window.innerWidth/2,
		height: window.innerHeight/2,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [Scene1,Scene2],
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Phaser.Game(config)