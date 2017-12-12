const Stats = require('stats-js');
const World = require('./modules/World');

window.onload = () =>{
	'use strict';
	let world = new World(window.innerWidth, window.innerHeight);
	//stats(for debug)の設定
	let stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '100px';
	stats.domElement.style.right = '0';
	stats.domElement.style.zIndex = 100;
	stats.setMode(3);
	//------------------------
	document.body.appendChild(stats.domElement);
	document.body.appendChild(world.dom);
	requestAnimationFrame(function render(){
		stats.begin();
		world.update();
		stats.end();
		requestAnimationFrame(render);
	});
	window.addEventListener('resize', ()=>world.resize(window.innerWidth, window.innerHeight));
};