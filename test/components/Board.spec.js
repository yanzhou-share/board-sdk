import jsdom from 'jsdom'
import chai from 'chai'
import Board from '../../src/components/Board'
chai.should()

// Configure JSDOM
const {JSDOM} = jsdom
const dom = new JSDOM(`<!DOCTYPE html><body><div><canvas id="test" width="800" height="600"></canvas></div></body>`, {
  url: 'https://example.org/',
  pretendToBeVisual: true,
})

// Configure global variables
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.Element = window.Element
global.localStorage = window.localStorage

const {fabric} = require('../../lib/fabric.min')
global.fabric = fabric

// Start tests
describe('Board', () => {
  const canvas = document.getElementById('test')
  const board = new Board(canvas)

  beforeEach(() => {
    board.layerDraw.add(
      new fabric.Line([50, 100, 200, 200], {
        left: 170,
        top: 150,
        stroke: 'red',
      }),
    )
  })

  afterEach(() => {
    board.clear()
  })

  it('can draw a line', () => {
    board.layerDraw._objects[0].aCoords.tl.x.should.equal(170)
  })

  it('can be cleared', () => {
    board.clear()
    board.layerDraw._objects.length.should.equal(0)
  })

  it('can be saved and then loaded', () => {
    board.save()
    board.clear()
    board.load()
    board.layerDraw._objects[0].aCoords.tl.x.should.equal(170)
  })
})
