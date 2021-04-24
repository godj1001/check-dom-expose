 /**
 * 节流
 */
 export const throttle = function (time = 1) {
  let date = null
  return (fn) => {
    let newTime = new Date().getTime()
    if (newTime > date + (time * 200) || !date) {
      date = newTime
      fn()
    }
  }
}
 /**
  * @description 判断元素是否在父元素中展示
  * @param childBoxScrollTop {Number} 子元素滚动顶部
  * @param childBoxScrollBottom {Number} 子元素滚动底部
  * @param rootClientHeight {Number} 父元素展示高度
  * @param rootScrollTop {Number} 父元素滚动距离
  * @return {Boolean}
  */
export const checkExpose = (childBoxScrollTop,childBoxScrollBottom,rootClientHeight,rootScrollTop) => {
  if (childBoxScrollBottom < rootScrollTop){
    return false
  }
  if (childBoxScrollTop<rootScrollTop+rootClientHeight){
    return true
  }
  return false
}
