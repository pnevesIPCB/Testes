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

    var somethingToDo = true;

    var stats = new Stats();

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

        gui = new dat.GUI();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;


        camera = new THREE.PerspectiveCamera(
            45, window.innerWidth / window.innerHeight, 0.1, 1000);
        //35, 36, 33

        //camera.position.set (30, 30, 30);

        /*
        camera.position.x = 35;
        camera.position.y = 36;
        camera.position.z = 33; */
        //camera.lookAt(scene.position);

        stats.showPanel (0);

        //cameraControl = new THREE.OrbitControls (camera, renderer.domElement);

        window.addEventListener('resize', function() {
            var WIDTH = window.innerWidth,
                HEIGHT = window.innerHeight;
            renderer.setSize(WIDTH, HEIGHT);
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();
        });

        var camGUIFolder = gui.addFolder ('Camera');

        camGUIFolder.add (guiValues, 'cameraX',-100, 100).step (1);
        camGUIFolder.add (guiValues, 'cameraY',-100, 100).step (1);
        camGUIFolder.add (guiValues, 'cameraZ',-100, 100).step (1);

        var lightGUIFolder = gui.addFolder ('Light');

        lightGUIFolder.add (guiValues, 'lightPosX',-100, 100).step (1);
        lightGUIFolder.add (guiValues, 'lightPosY',-100, 100).step (1);
        lightGUIFolder.add (guiValues, 'lightPosZ',-100, 100).step (1);

        document.body.appendChild( stats.dom );

        document.body.appendChild(renderer.domElement);

    }

    function draw(){

        var sphereGeometry = new THREE.SphereGeometry(15, 30, 30);
        //var sphereMaterial = new THREE.MeshNormalMaterial();
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x00FF00});
        var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        earthMesh.name = 'earth';
        scene.add(earthMesh);

        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(guiValues.lightPosX, guiValues.lightPosY, guiValues.lightPosZ);
        spotLight.castShadow = true;
        scene.add(spotLight);

    }

    function render() {
        stats.begin();
        // render using requestAnimationFrame
        //cameraRot(guiVariables.rotSpeed);

        //cameraControl.update();

        camera.position.set (guiValues.cameraX, guiValues.cameraY, guiValues.cameraZ);
        spotLight.position.set(guiValues.lightPosX, guiValues.lightPosY, guiValues.lightPosZ);

        camera.lookAt(scene.position);
        renderer.render(scene, camera);

        stats.end();
        requestAnimationFrame(render);
    }

    //testing some "game" functionality
    function updateScene(){

    }

    window.onload = function(){
        init();
        draw();
        updateScene();
        render();
    };



})();