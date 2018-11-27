/**
 * 白板主类
 * @constructor
 */
class Board {
  /**
   * 创建白板对象
   * @param {HTMLElement} node 插入白板的节点
   * @param {object} options 选项
   * @property {boolean} options.interactive 白板是否可交互
   * @property {boolean} options.fullSelection 框选白板元素的判断方法
   * @param {array} plugins 需要使用的插件
   * @param {object} key 用于鉴权的口令
   */
  constructor(node, options = {}, plugins = [], key = {}) {
    const props = {
      width: node.offsetWidth,
      height: node.offsetHeight,
      preserveObjectStacking: true,
      perPixelTargetFind: true,
      targetFindTolerance: 15,
      selectionFullyContained: options.hasOwnProperty('fullSelection') ? options.fullSelection : true,
      interactive: options.hasOwnProperty('interactive') ? options.interactive : false,
      skipTargetFind: false,
      isDrawingMode: true,
    }
    this.layerDraw =
      typeof window !== undefined
        ? new fabric.Canvas(node, props)
        : fabric.createCanvasForNode(props.width, props.height)
  }

  /**
   * 清除白板内容
   */
  clear() {
    this.layerDraw.clear()
  }

  /**
   * 获取白板上现有的对象
   * @return {array} 一个数组，包含白板上的全部对象
   */
  getObjects() {
    return this.layerDraw._objects.map(object => {
      return {
        path: object.path,
        pathOffset: object.pathOffset,
        scaleX: object.scaleX,
        scaleY: object.scaleY,
        skewX: object.skewX,
        skewY: object.skewY,
      }
    })
  }

  /**
   * 保存白板内容
   */
  save() {
    localStorage.setItem('canvas', JSON.stringify(this.layerDraw.toJSON()))
  }

  /**
   * 加载保存的白板内容
   */
  load() {
    this.layerDraw.loadFromJSON(JSON.parse(localStorage.getItem('canvas')))
  }
}

export default Board
