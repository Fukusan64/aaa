const THREE = require('three');
const AlertDisplay = require('./AlertDisplay');
const DataDisplay = require('./DataDisplay');
module.exports = class DisplayCanvas{
	constructor(w, h){
		this.canvas = document.createElement("canvas");
		this.canvas.width = w;
		this.canvas.height = h;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.transform(-1, 0, 0, 1, w, 0);
		this.clock = new THREE.Clock();
		this.alertDisplay = new AlertDisplay(w, h, 8, 6);
		this.dataDisplay = new DataDisplay(this.ctx, this.clock);
	}
	update(){
		let w = this.canvas.width;
		let h = this.canvas.height;
		this.ctx.clearRect(0, 0, w, h);
		this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);	
		this.alertDisplay.update(this.ctx, this.clock.getElapsedTime());
		this.dataDisplay.update();
	}
};