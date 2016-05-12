import THREE from 'three'
import THREESTLLoader from 'three-stl-loader'
var STLLoader = THREESTLLoader(THREE)
var loader = new STLLoader()

function loadBodyMesh () {
  return new Promise((resolve, reject) => {
    loader.load('./media/body.stl', (geometry) => {
      var material = new THREE.MeshNormalMaterial()
      var mesh = new THREE.Mesh(geometry, material)
      resolve(mesh)
    })
  })
}

export default loadBodyMesh
