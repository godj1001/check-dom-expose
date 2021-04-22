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

export const checkExpose = (childScrollTop,childScrollBottom,clientHeight,scrollTop) => {
  if (childScrollBottom < scrollTop){
    return false
  }
  if (childScrollTop<scrollTop+clientHeight){
    return true
  }
  return false
}
