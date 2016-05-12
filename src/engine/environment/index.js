import THREE from 'three'
import $ from 'jquery'
import ThreeOrbitControls from 'three-orbit-controls'
var OrbitControls = ThreeOrbitControls(THREE)
import WindowResize from 'three-window-resize'
import Body from './body.js'
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

    this.bodies = []
    this._addBodiesToScene(12)
  }

  render () {
    this.bodies.forEach((body) => body.updateTreFlip() )
    this.renderer.render(this.scene, this.camera)
  }

  // 'private'

  _addBodiesToScene (bodyCount) {
    var spacing = 40
    range(bodyCount).forEach((i) => {
      var body = new Body()
      this.bodies.push(body)
      body.load((mesh) => {
        var x = spacing * i - (spacing * bodyCount / 2)
        mesh.position.set(x, 0, 0)
        this.scene.add(mesh)
      })
    })
  }

}

export default Environment
