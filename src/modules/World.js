const THREE = require('three');
const OrbitControls = require('three-orbitcontrols');
const SphereDisplay = require('./SphereDisplay');
module.exports = class World{
	constructor(w, h){
		this.renderer = new THREE.WebGLRenderer({antialias: true,  alpha: true});
		this.renderer.shadowMap.enabled = true;
		this.renderer.gammaOutput = true;
		this.renderer.gammaInput = true;
		this.renderer.setClearColor(0x0f0000, 1);
		this.dom = this.renderer.domElement;
		this.dom.id = 'mainCanvas';
		this.width = w;
		this.height = h;
		this.renderer.setSize(w, h);
		this.resizeFlag = false;
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, 1000000);
		this.camera.position.set(-625, -460, 0);
		this.camera.lookAt(0, 0, 0);
		this.scene.add(this.camera);
		this.sphereDisplay = new SphereDisplay(600);
		this.scene.add(this.sphereDisplay.boneMesh);
		this.scene.add(this.sphereDisplay.displayMesh);
		this.scene.add(this.sphereDisplay.particlesMesh);
		this.control = new OrbitControls(this.camera);
		this.control.minDistance = 100;
		this.control.maxDistance = 1000;
		this.control.autoRotateSpeed = 0.8;
		this.control.rotateSpeed = 0.8;
	}
	update(){
		if(this.resizeFlag){
			this.renderer.setSize(this.width, this.height);
			this.camera.aspect = this.width / this.height;
			this.camera.updateProjectionMatrix();
			this.resizeFlag = false;
		}
		this.sphereDisplay.update();
		this.control.update();
		this.renderer.render(this.scene, this.camera);
	}
	resize(w, h){
		this.width = w;
		this.height = h;
		this.resizeFlag = true;
	}

};