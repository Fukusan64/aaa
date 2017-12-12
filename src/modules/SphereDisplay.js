const THREE = require('three');
const DisplayCanvas = require('./DisplayCanvas');
const PointTexture = require('./PointTexture');
module.exports = class SphereDisplay{
	constructor(r){
		this.displayCanvas = new DisplayCanvas(2 ** 11, 2 ** 10);
		this.texture = new THREE.CanvasTexture(this.displayCanvas.canvas);
		let pointTexture = new THREE.CanvasTexture((new PointTexture(16)).canvas);
		let boneGeometry = new THREE.IcosahedronGeometry(r, 2);
		this.boneMesh = new THREE.Mesh(
			boneGeometry,
			new THREE.MeshBasicMaterial({
				color: 0xff0000,
				wireframe: true,
				side: THREE.FrontSide,
				transparent: true,
				opacity: 0.2
			})
		);
		let pMaterial = new THREE.PointsMaterial({
			size: 7,
			color: 0xaaaaaa,
			map: pointTexture,
			blending: THREE.AdditiveBlending,
			vertexColors: THREE.VertexColors,
			transparent: true,
			opacity: 1
		});
		this.particlesMesh = new THREE.Points(boneGeometry, pMaterial);
		this.particlesMesh.sortParticles = true;

		this.displayMesh = new THREE.Mesh(
			new THREE.SphereGeometry(r * 0.95, 100, 100),
			new THREE.MeshBasicMaterial({
				map: this.texture,
				color: 0xffffff,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 0.8
			})
		);
	}
	update(){
		this.displayCanvas.update();
		this.texture.needsUpdate = true;
	}
};