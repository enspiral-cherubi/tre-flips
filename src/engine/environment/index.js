import THREE from 'three'
import $ from 'jquery'
import ThreeOrbitControls from 'three-orbit-controls'
var OrbitControls = ThreeOrbitControls(THREE)
import WindowResize from 'three-window-resize'
import loadBodyMesh from './load-body-mesh.js'
import range from 'lodash.range'

class Environment {

  constructor () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000)
    this.camera.position.z = 250

    this.controls = new OrbitControls(this.camera)

    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: $('#three-canvas')[0]})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 1)

    var windowResize = new WindowResize(this.renderer, this.camera)

    this._addBodiesToScene(12)
  }

  render () {
    this.renderer.render(this.scene, this.camera)
  }

  // 'private'

  _addBodiesToScene (bodyCount) {
    var spacing = 40
    range(bodyCount).forEach((i) => {
      loadBodyMesh().then((mesh) => {
        var x = spacing * i - (spacing * bodyCount / 2)
        mesh.position.set(x, 0, 0)
        mesh.rotation.set(Math.PI / 2, 0, Math.PI / 1.2)
        this.scene.add(mesh)
      })
    })
  }
}

export default Environment
