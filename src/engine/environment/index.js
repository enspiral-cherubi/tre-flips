import THREE from 'three'
import $ from 'jquery'
import ThreeOrbitControls from 'three-orbit-controls'
var OrbitControls = ThreeOrbitControls(THREE)
import WindowResize from 'three-window-resize'
import Cube from './cube.js'
import range from 'lodash.range'

class Environment {

  constructor () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000)
    this.camera.position.z = 10

    this.controls = new OrbitControls(this.camera)

    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: $('#three-canvas')[0]})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 1)

    var windowResize = new WindowResize(this.renderer, this.camera)

    var axisHelper = new THREE.AxisHelper(5)
    this.scene.add(axisHelper)

    this.cubeMatrix = []
    this._addCubesToScene(50, 50)
  }

  render () {
    this.cubeMatrix.forEach((row) => {
      row.forEach((cube) => cube.updatePosition())
    })
    this.renderer.render(this.scene, this.camera)
  }

  // 'private'

  _addCubesToScene (numRows, numCubesInRow) {
    this.cubeMatrix = range(numRows).map((r) => {
      return range(numCubesInRow).map((c) => {
        var cube = new Cube(r + c)
        cube.mesh.position.set(c, r, 0)
        this.scene.add(cube.mesh)
        return cube
      })
    })
  }

}

export default Environment
