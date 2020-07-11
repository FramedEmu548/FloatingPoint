    //babylon.js
        window.addEventListener('DOMContentLoaded', function(){
            var canvas = document.getElementById('renderCanvas');
            //load Babylon.js
            var engine = new BABYLON.Engine(canvas, true);

            var createScene = function(){
                var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 2.5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.inertia = 0;
    camera.angularSensibilityX = 9999999;
    camera.angularSensibilityY = 9999999;
    camera.moveSensibility = 9999999;

    

                // light set up
                var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

                //sphere creation
                var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
                sphere.position.y = 1;
                //create ground texture
                var groundTexture = new BABYLON.StandardMaterial("groundTexture", scene);
                groundTexture.diffuseTexture = new BABYLON.Texture("ground.jpg", scene); 
                // create ground
                var ground = BABYLON.Mesh.CreateGround('ground1', 150, 150, 150, scene);
                ground.material = groundTexture;
               
                //create gravity
                scene.gravity = new BABYLON.Vector3(0, -9.81, 0);



               

///////

                //create skybox (in progress)
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox.zip", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.disableLighting = true;
	skybox.material = skyboxMaterial;		
                
                //obsticle hitting
                camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
                scene.collisionsEnabled = true;
                camera.checkCollisions = true;
                ground.checkCollisions = true;
                sphere.checkCollisions = true;
                camera.applyGravity = true;

                //ammo count
                var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

                var ammoCount = new BABYLON.GUI.TextBlock();
                ammoCount.text = ammoInClip +' / ' + totalAmmo;
                ammoCount.color = "black";
                ammoCount.fontSize = 50;
                ammoCount.fontWeight = "bolder"; 
                ammoCount.paddingLeft = 600;
                ammoCount.resizeToFit = true;
                ammoCount.paddingTop = 1000;
                advancedTexture.addControl(ammoCount);

                return scene;

            }
            ///////////////////////////////////////////////

            let totalAmmo = 500;
            let ammoInClip = 240;
            var scene = createScene();

            engine.runRenderLoop(function(){
                scene.render();    
        });

             	window.addEventListener("resize", function () {
                engine.resize();
        });});
