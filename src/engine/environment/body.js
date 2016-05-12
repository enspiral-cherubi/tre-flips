import THREE from 'three'
import THREESTLLoader from 'three-stl-loader'
var STLLoader = THREESTLLoader(THREE)
var loader = new STLLoader()

class Body {

  constructor () {
  }

  load (cb) {
    loader.load('./media/body.stl', (geometry) => {
      var material = new THREE.MeshNormalMaterial()
      this.mesh = new THREE.Mesh(geometry, material)
      this.mesh.rotation.set(Math.PI / 2, 0, Math.PI / 1.2)
      cb(this.mesh)
    })
  }

  // 'private'
}

export default Body
