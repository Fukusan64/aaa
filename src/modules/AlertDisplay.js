module.exports = class AlertDisplay{
	constructor(w, h, verticalDivision, horizontalDivision){
		this.h = h;
		this.w = w; 
		this.th = h / (horizontalDivision * 6);
		this.hd = horizontalDivision;
		this.margin = 10;
		this.onTextureCanvas = document.createElement('canvas');

		this.onTextureCanvas.width = w + this.margin * 2;
		this.onTextureCanvas.height = this.th + this.margin * 2;
		let onTextureCtx = this.onTextureCanvas.getContext('2d');

		onTextureCtx.fillStyle = 'rgba(0,0,0,0.5)';
		onTextureCtx.fillRect(this.margin, this.margin, w, this.th);
		onTextureCtx.strokeStyle = 'red';
		onTextureCtx.lineWidth = 3;
		onTextureCtx.fillStyle = 'red';
		onTextureCtx.fillRect(this.margin, this.margin + this.th / 8, w, this.th / 4 * 3);
		for(let i = 0;i < w + this.margin * 2;i += w / 200){
			onTextureCtx.beginPath();
			onTextureCtx.moveTo(i, this.margin - 5);
			onTextureCtx.lineTo(i + w / 200 + this.margin, this.th / 2 + this.margin);
			onTextureCtx.lineTo(i, this.th + this.margin * 2 - 5);
			onTextureCtx.stroke();
		}

		onTextureCtx.textBaseline = 'middle';
		onTextureCtx.textAlign = 'center';
		onTextureCtx.globalCompositeOperation = 'xor';
		onTextureCtx.font = "20px 'ヒラギノ角ゴ Std W8'";
		for(let i = 0;i < verticalDivision;i++){
			onTextureCtx.fillText('ALERT', (i + 0.5) * w / verticalDivision + this.margin, this.th / 2 + this.margin);
		}
		onTextureCtx.globalCompositeOperation = 'source-over';
		onTextureCtx.fillStyle = 'rgba(0,0,0,0.5)';
		for(let i = 0;i < verticalDivision;i++){
			onTextureCtx.fillText('ALERT', (i + 0.5) * w / verticalDivision + this.margin, this.th / 2 + this.margin);
		}
		
		this.offTextureCanvas = document.createElement('canvas');
		this.offTextureCanvas.width =  w + this.margin * 2;
		this.offTextureCanvas.height = this.th + this.margin * 2;
		let offTextureCtx = this.offTextureCanvas.getContext('2d');

		offTextureCtx.fillStyle = 'rgba(0,0,0,0.5)';
		offTextureCtx.fillRect(this.margin, this.margin, w, this.th);
		offTextureCtx.strokeStyle = 'red';
		offTextureCtx.lineWidth = 3;
		offTextureCtx.fillStyle = 'red';
		offTextureCtx.fillRect(this.margin, this.margin + this.th / 8, w, this.th / 4 * 3);
		for(let i = 0;i < w + this.margin * 2;i += w / 200){
			offTextureCtx.beginPath();
			offTextureCtx.moveTo(i, this.margin - 5);
			offTextureCtx.lineTo(i + w / 200 + this.margin, this.th / 2 + this.margin);
			offTextureCtx.lineTo(i, this.th + this.margin * 2 - 5);
			offTextureCtx.stroke();
		}

		offTextureCtx.globalCompositeOperation = 'xor';
		offTextureCtx.fillRect(this.margin, this.margin + this.th / 6, w, this.th / 6 * 4);
		offTextureCtx.globalCompositeOperation = 'source-over';
		offTextureCtx.fillStyle = 'rgba(0,0,0,0.5)';
		offTextureCtx.fillRect(this.margin, this.margin + this.th / 6, w, this.th / 6 * 4);

		offTextureCtx.fillStyle = "red";
		offTextureCtx.fillRect(this.margin, this.margin + this.th / 5.5, w, this.th / 8);
		offTextureCtx.fillRect(this.margin, this.margin + this.th / 2, w, this.th / 8);
		offTextureCtx.fillRect(this.margin, this.margin + this.th / 5.5 * 4.5, w, -this.th / 8);

		offTextureCtx.lineWidth = 2;
		for(let i = 0;i <= verticalDivision;i++){
			offTextureCtx.beginPath();
			offTextureCtx.moveTo((i + 0.25) * w / verticalDivision + this.margin - w / 250, this.margin + this.th / 6);
			offTextureCtx.lineTo((i + 0.25) * w / verticalDivision + this.margin + w / 250, this.margin + this.th / 6 * 5);
			offTextureCtx.stroke();
			offTextureCtx.beginPath();
			offTextureCtx.moveTo((i + 0.75) * w / verticalDivision + this.margin + w / 250, this.margin + this.th / 6);
			offTextureCtx.lineTo((i + 0.75) * w / verticalDivision + this.margin - w / 250, this.margin + this.th / 6 * 5);
			offTextureCtx.stroke();
		}

		this.previousTime = 0;
	}
	update(ctx, time){
		if(time - this.previousTime > 0.5){
			this.islighting =! this.islighting;
			this.previousTime = time;
		}
		for(let i = 1;i < this.hd;i++){
			ctx.drawImage(
				this.islighting ? this.onTextureCanvas : this.offTextureCanvas,
				this.margin,
				this.margin,
				this.w,
				this.th,
				0,
				i * this.h / this.hd - this.th / 2,
				this.w,
				this.th
			);
		}
	}
};