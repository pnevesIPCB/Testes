/**
 * Created by pauloalexandreneves on 28/06/16.
 */
;(function(){

    // global variables
    var renderer;
    var scene;
    var camera;

    var faceColors = [0xff0000, 0x00ff00, 0x0000ff,
        0xffff00, 0x800000, 0x808000,
        0x008000, 0x00ffff, 0x008080,
        0x000080, 0x800080, 0xff00ff,
        0x000000, 0x808080, 0xc0c0c0,
        0xff0000];

    var guiVariables = new function(){
        this.rotSpeed = 0.01;

    };

    var stats = new Stats();

    function initGUI(){
        var gui = new dat.GUI();

        gui.add (guiVariables, 'rotSpeed', -0.01, 0.01);
    }

    function init() {
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;


        camera = new THREE.PerspectiveCamera(
           45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 15;
        camera.position.y = 16;
        camera.position.z = 13;
        camera.lookAt(scene.position);

        stats.showPanel (0);

        cameraControl = new THREE.OrbitControls (camera, renderer.domElement);

        window.addEventListener('resize', function() {
            var WIDTH = window.innerWidth,
                HEIGHT = window.innerHeight;
            renderer.setSize(WIDTH, HEIGHT);
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();
        });

        document.body.appendChild( stats.dom );

        document.body.appendChild(renderer.domElement);

    };

    function cameraRot(rotSpeed){
        camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
        camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
        camera.lookAt(scene.position);

    }

    function draw (){
        var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);

        /*var cubeMaterial = new THREE.MeshLambertMaterial({
            color: "red", transparent : true, opacity:0.6
        });*/
        var materialArray = applyFaceColors(cubeGeometry);
        var cubeMaterial = new THREE.MeshFaceMaterial(materialArray);

        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        scene.add(cube);

        var planeGeometry = new THREE.PlaneGeometry(20, 20);
        var planeMaterial = new THREE.MeshLambertMaterial({
            color: 0xdddddd
        });

        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.y = -2;
        scene.add(plane);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(10, 20, 20);
        spotLight.castShadow = true;
        scene.add(spotLight);

        addVertices (cube);


        //render();
    }

    function addVertices(mesh) {
        var vertices = mesh.geometry.vertices;
        var vertexMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
        // for each vertex, add a sphere
        vertices.forEach(function (vertex) {
            var vertexSphere = new THREE.SphereGeometry(0.15);
            var vertexMesh = new THREE.Mesh(vertexSphere, vertexMaterial);
            vertexMesh.position.set (vertex.x, vertex.y, vertex.z);
            scene.add(vertexMesh);
        });
    }

    /**
     * Applies coloring to each individual face and updates the geometry so
     * the materialIndex points to the correct face
     *
     * @param geometry the geometry to create facecolor for
     * @return an array of materials
     */
    function applyFaceColors(geometry) {
        var result = [];
        var faceCount = 0;
        geometry.faces.forEach(function(face) {
            face.materialIndex = faceCount++;
            result.push(new THREE.MeshBasicMaterial({
                // simple way to create a blueish color for each face
                color: faceColors[faceCount]
            }));
        });
        return result;
    }

    function render() {
        stats.begin();
        // render using requestAnimationFrame
        //cameraRot(guiVariables.rotSpeed);

        cameraControl.update();
        renderer.render(scene, camera);

        stats.end();
        requestAnimationFrame(render);
    };

    window.onload = function(){
        init();
        initGUI();
        draw();
        render();

    };


})();

