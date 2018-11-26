import * as fabric from 'fabric'

/**
 * 白板主类
 * @constructor
 */
class Board {
  /**
   * 创建白板对象
   * @param {string} node 插入白板的节点名称
   * @param {object} options 选项
   *   @param {boolean} interactive 白板是否可交互
   */
  constructor(node, options = {}) {
    const elem = document.getElementById(node)
    this.layerDraw = new fabric.Canvas(node, {
      width: elem.offsetWidth,
      height: elem.offsetHeight,
      preserveObjectStacking: true,
      perPixelTargetFind: true,
      targetFindTolerance: 15,
      selectionFullyContained: true,
      interactive: options.hasOwnProperty('interactive') ? options.interactive : false,
      skipTargetFind: false,
      isDrawingMode: true,
    })
  }
}

export default Board
