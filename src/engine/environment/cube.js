import THREE from 'three'
import randomColor from 'randomcolor'

class Cube {

  constructor (z) {
    this.loaded = false
    var geometry = new THREE.BoxGeometry(1,1,1)
    var material = new THREE.MeshBasicMaterial()
    material.color.set(randomColor({format: 'rgb'}))
    this.mesh = new THREE.Mesh(geometry, material)
    this.z = z
  }

  updatePosition () {
    this.z += Math.PI / 180 * 4
    this.mesh.position.z = Math.sin(this.z)
  }

}

export default Cube
