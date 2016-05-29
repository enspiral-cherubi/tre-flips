import THREE from 'three'

class Cube {

  constructor (z) {
    this.loaded = false
    var geometry = new THREE.BoxGeometry(0.75,0.75,0.75)
    var material = new THREE.MeshBasicMaterial()
    material.color.setRGB(Math.random(), Math.random(), Math.random())
    this.mesh = new THREE.Mesh(geometry, material)
    this.z = z
    this.mesh.rotation.x = Math.PI / 2
  }

  updatePosition () {
    this.z += Math.PI / 180 * 4
    this.mesh.position.z = 0.5 * Math.sin(this.z) + Math.cos(this.z / 3) - Math.sin(this.z / 10)
  }

  setRGB (r,g,b) {
    this.mesh.material.color.setRGB(r,g,b)
  }

  color () {
    return this.mesh.material.color
  }

}

export default Cube
