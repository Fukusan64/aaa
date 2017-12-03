/*global THREE,Stats*/
window.onload = () =>{
	'use strict';
	class World{
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
			this.control = new THREE.OrbitControls(this.camera);
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

	}
	class SphereDisplay{
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
	}
	class DisplayCanvas{
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
	}
	class AlertDisplay{
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
			
			this.offTextureCanvas = document.createElement('canvas');
			this.offTextureCanvas.width =  w + this.margin * 2;
			this.offTextureCanvas.height = this.th + this.margin * 2;
			let offTextureCtx = this.offTextureCanvas.getContext('2d');

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
	}
	class DataDisplay{
		constructor(ctx, w, h){
			this.displays = [new WhiteDataDisplay(ctx, w, h), new RedDataDisplay(ctx, w, h)];
			this.displayIndex = 0;
		}
		update(){
			if(!this.displays[this.displayIndex].finished)this.displays[this.displayIndex].update();
			else this.displayIndex++;
			if(this.displayIndex == this.displays.length)this.displayIndex = 0;
		}

	}
	//DOTO:お前らもきれいに書かれてろ
	class WhiteDataDisplay{
		constructor(w, h){
		}

		update(ctx){
		}

	}
	class RedDataDisplay{
		constructor(ctx, w, h){
			this.w = w;
			this.h = h;
			this.ctx = ctx;
			this.finished = false;
		}

		update(){
			
		}
	}


	class PointTexture{
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
	}

	


	let world = new World(window.innerWidth, window.innerHeight);
	//stats(for debug)の設定
	let stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '100px';
	stats.domElement.style.right = '0';
	stats.domElement.style.zIndex = 100;
	stats.showPanel(0);
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