const WhiteDataDisplay = require('./WhiteDataDisplay');
const RedDataDisplay = require('./RedDataDisplay');
module.exports = class DataDisplay{
	constructor(ctx, w, h){
		this.displays = [new WhiteDataDisplay(ctx, w, h), new RedDataDisplay(ctx, w, h)];
		this.displayIndex = 0;
	}
	update(){
		if(!this.displays[this.displayIndex].finished)this.displays[this.displayIndex].update();
		else this.displayIndex++;
		if(this.displayIndex == this.displays.length)this.displayIndex = 0;
	}
};