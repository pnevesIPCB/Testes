/**
 * Created by pauloalexandreneves on 23/11/2016.
 */

;(function(){

    // global variables
    var renderer;
    var scene;
    var camera;
    var gui;
    var spotLight;
    var earthMesh;
    var position = {x: 0, y:0, z:0};
    var keyboarder;
    var earthMaterial;

    var earthPosition ={x:0, y:0, z:0};

    var stats = new Stats();

    var promise = new Promise (function (resolve, reject){
        earthTexture = new THREE.TextureLoader();
        earthTexture.load('earthmap4k.jpg',
            function ( texture ) {
                // do something with the texture
                earthMaterial = new THREE.MeshBasicMaterial();
                earthMaterial.map = texture;
                resolve ("success");
            },
            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            // Function called when download errors
            function ( xhr ) {
                reject("not loaded");
            });
    });


    var guiValues = new function(){
        this.cameraX = 30;
        this.cameraY = 30;
        this.cameraZ = 30;

        this.lightPosX = 100;
        this.lightPosY = 100;
        this.lightPosZ = 100;
    };



    function init() {
        scene = new THREE.Scene();

        keyboarder = new Keyboarder();

        gui = new dat.GUI();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;


        camera = new THREE.PerspectiveCamera(
            45, window.innerWidth / window.innerHeight, 0.1, 1000);
        //35, 36, 33

        camera.position.set (30, 30, 30);

        /*
        camera.position.x = 35;
        camera.position.y = 36;
        camera.position.z = 33; */
        //camera.lookAt(scene.position);

        stats.showPanel (0);

        cameraControl = new THREE.OrbitControls (camera, renderer.domElement);


        camera.lookAt (scene.position);

        window.addEventListener('resize', function() {
            var WIDTH = window.innerWidth,
                HEIGHT = window.innerHeight;
            renderer.setSize(WIDTH, HEIGHT);
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();
        });

        /*
        var camGUIFolder = gui.addFolder ('Camera');

        camGUIFolder.add (guiValues, 'cameraX',-100, 100).step (1);
        camGUIFolder.add (guiValues, 'cameraY',-100, 100).step (1);
        camGUIFolder.add (guiValues, 'cameraZ',-100, 100).step (1);

        var lightGUIFolder = gui.addFolder ('Light');

        lightGUIFolder.add (guiValues, 'lightPosX',-100, 100).step (1);
        lightGUIFolder.add (guiValues, 'lightPosY',-100, 100).step (1);
        lightGUIFolder.add (guiValues, 'lightPosZ',-100, 100).step (1);

        */

        var sphereGeometry = new THREE.SphereGeometry(15, 30, 30);

        promise.then (function(result) {
            console.log(result); // Correu bem!
            earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
            earthMesh.name = 'earth';
            scene.add(earthMesh);
            render();
        }, function(err) {
            console.log(err); // Erro!!!
        });


        document.body.appendChild( stats.dom );

        document.body.appendChild(renderer.domElement);



    }

    function draw(){



        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(guiValues.lightPosX, guiValues.lightPosY, guiValues.lightPosZ);
        spotLight.castShadow = true;
        scene.add(spotLight);

    }

    function render() {
        stats.begin();
        // render using requestAnimationFrame
        //cameraRot(guiVariables.rotSpeed);

        cameraControl.update();

        //camera.position.set (guiValues.cameraX, guiValues.cameraY, guiValues.cameraZ);
        //spotLight.position.set(guiValues.lightPosX, guiValues.lightPosY, guiValues.lightPosZ);

        updateScene();



        camera.lookAt(scene.position);
        renderer.render(scene, camera);

        stats.end();
        requestAnimationFrame(render);
    }

    //testing some "game" functionality
    function updateScene(){

        if (keyboarder.isDown(keyboarder.KEYS.LEFT))
            earthPosition.x -= 0.1;

        earthMesh.position.set (earthPosition.x, earthPosition.y, earthPosition.z);
    }

    window.onload = function(){
        init();
        draw();
    };


    var Keyboarder = function(){
        var keyState = {};
        window.onkeydown = function (e){
            keyState[e.keyCode] = true;
        };

        window.onkeyup = function (e){
            keyState[e.keyCode] = false;
        };

        this.isDown = function (keyCode){
            return keyState[keyCode] === true;
        };

        this.isUp = function (keyCode){
            return keyState[keyCode] === false;
        };

        this.wasToggled = function (keyCode){


        };
        this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32, PAUSE: 80};

        //toggle state
        // 0 not on
        //1 on
        //2 toggled
        //this.STATE = {left = false}

    };

})();