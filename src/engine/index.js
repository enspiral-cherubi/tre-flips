import THREE from 'three'
import Environment from './environment'
import View from './view'
import $ from 'jquery'
import loop from 'raf-loop'
import average from 'average'

class Engine {

  constructor () {
    this.environment = new Environment()
    this.view = new View()
  }

  bindEventListeners () {
    $(window).load(this.view.closeLoadingScreen)
  }

  start () {
    var matrix = this.environment.cubeMatrix
    var r = 0

    loop((t) => {
      this.environment.render()

      var rowIndex = r % matrix.length
      var row = matrix[rowIndex]

      row.forEach((cube, c, array) => {
        var leftNeighbor = c === 0 ? array[c] : array[c - 1]
        var rightNeighbor = c === array.length - 1 ? array[0] : array[c + 1]

        var nextCube = rowIndex === matrix.length - 1 ? matrix[0][c] : matrix[rowIndex + 1][c]
        var avgR = average([leftNeighbor.color().r, cube.color().r, rightNeighbor.color().r]) // 0 - 1
        var avgG = average([leftNeighbor.color().g, cube.color().g, rightNeighbor.color().g]) // 0 - 1
        var avgB = average([leftNeighbor.color().b, cube.color().b, rightNeighbor.color().b]) // 0 - 1
        nextCube.setRGB(
          1 + 0.5 * Math.cos(avgR * 2 * Math.PI),
          1 + 0.5 * Math.sin(avgG * 2 * Math.PI),
          1 + 0.5 * Math.cos(avgB * 2 * Math.PI)
        )
      })

      r++
    }).start()

    setInterval(() => {
    }, 100)
  }

}

export default Engine
