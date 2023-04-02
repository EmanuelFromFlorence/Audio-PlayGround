import Experience from "../Experience";
import * as THREE from 'three'
import OsciloscopeVertexShader from "../Shaders/Osciloscope/OsciloscopeVertexShader.glsl"
import OsciloscopeFragmentShader from "../Shaders/Osciloscope/OsciloscopeFragmentShader.glsl"


export default class Osciloscope {
    constructor(world) {
        this.experience           = new Experience();
        this.scene                = this.experience.scene;
        this.sizes                = this.experience.sizes;
        this.world                = world;
        
        this.setup();
    }

    setup() {

        this.geometry = new THREE.PlaneGeometry(6, 3);

        this.material = new THREE.ShaderMaterial({
            uniforms : {
                uAudioTexture : { value : this.world.frequencyTexture.bufferCanvas.texture },
                uSize         : { value : 0.005 },
                uAlpha        : { value : 1.0 }
//                uTime         : { value : 0 }
            },
            vertexShader    : OsciloscopeVertexShader,
            fragmentShader  : OsciloscopeFragmentShader,
            transparent     : true
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
        this.mesh.position.y += 3;
        this.mesh.position.x -= 5;
        this.material.side = THREE.DoubleSide;

    }

/*    resize() {
    }*/

/*    update() {
    }*/
    

}