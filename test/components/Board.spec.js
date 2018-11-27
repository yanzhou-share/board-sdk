import jsdom from 'jsdom'
import chai from 'chai'
import Board from '../../src/components/Board'
chai.should()

const {JSDOM} = jsdom
const dom = new JSDOM(`<!DOCTYPE html><body><div><canvas id="test" width="800" height="600"></canvas></div></body>`, {
  pretendToBeVisual: true,
})
const {document} = dom.window
global.document = document
global.window = dom.window

const {fabric} = require('../../lib/fabric.min')
global.fabric = fabric

describe('Board', () => {
  const canvas = document.getElementById('test')
  const board = new Board(canvas)

  afterEach(() => {
    board.clear()
  })

  it('can draw a line', () => {
    board.layerDraw.add(
      new fabric.Line([50, 100, 200, 200], {
        left: 170,
        top: 150,
        stroke: 'red',
      }),
    )
    board.layerDraw._objects[0].aCoords.tl.x.should.equal(170)
  })
})
