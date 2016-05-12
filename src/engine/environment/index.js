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

    // var vector = new THREE.Vector3(0, 0, -1);
    // vector.applyEuler(this.camera.rotation, this.camera.eulerOrder);
    // this.camera.lookAt(vector)

    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: $('#three-canvas')[0]})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 1)

    var windowResize = new WindowResize(this.renderer, this.camera)

    var axisHelper = new THREE.AxisHelper(5)
    this.scene.add(axisHelper)

    this.cubeMatrix = []
    this._addCubesToScene(100, 25)
  }

  render () {
    this.cubeMatrix.forEach((cube) => cube.updatePosition() )
    this.renderer.render(this.scene, this.camera)
  }

  // 'private'

  _addCubesToScene (numRows, numCubesInRow) {
    range(numRows).forEach((r) => {
      range(numCubesInRow).forEach((c) => {
        var cube = new Cube(r + c)
        var x = c, y = r
        cube.mesh.position.set(x, y, 0)
        this.scene.add(cube.mesh)
        this.cubeMatrix.push(cube)
      })
    })
  }

}

export default Environment
