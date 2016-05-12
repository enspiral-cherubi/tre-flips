import THREE from 'three'
import THREESTLLoader from 'three-stl-loader'
var STLLoader = THREESTLLoader(THREE)
var loader = new STLLoader()

class Body {

  constructor () {
    this.loaded = false
  }

  load (cb) {
    loader.load('./media/body.stl', (geometry) => {
      var material = new THREE.MeshNormalMaterial()
      this.mesh = new THREE.Mesh(geometry, material)
      this.mesh.rotation.set(0, 0, 0)
      cb(this.mesh)
      this.loaded = true
    })
  }

  updateTreFlip () {
    if (this.loaded) {
      this.mesh.rotation.z += Math.PI / 90
      this.mesh.rotation.y += Math.PI / 90
      this.mesh.position.y = 100 * Math.sin(this.mesh.rotation.z)
    }
  }
}

export default Body
