import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'
import Experience from "./Experience";


export default class Camera {
    // Constructor
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.setInstance();
        this.setOrbitControls();
    }


    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000);
        const z = (this.sizes.width > this.sizes.height) ? 20 : 50;
        this.instance.position.set(-z,16,z);
        this.scene.add(this.instance);
    }


    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
//        this.controls.enableDamping = true;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        
    }
}