module.exports = class PointTexture{
	constructor(w){
		this.canvas = document.createElement("canvas");
		this.canvas.width = w;
		this.canvas.height = w;
		let ctx = this.canvas.getContext('2d');
		ctx.fillStyle = 'rgba(255,128,128,0.007)';
		for(let r = w / 1.4;r > 0;r -= w * 0.01){
			ctx.beginPath();
			ctx.arc(w / 2, w / 2, r, 0, Math.PI * 2, false);
			ctx.fill();
		}
	}
};