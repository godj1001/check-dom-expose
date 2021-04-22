/**
 * dom expose check
 * @param root {Element}
 * @param children {Element[]}
 */
import {throttle,checkExpose} from './util/index';

const DomExpose = (root,children) => {
  /**
   * verify
   */
  if (!(root instanceof Element) ){
    console.error(`${root} is not element`)
    return
  }
  if (!Array.isArray(children)){
    console.error(`${children} is not array`)
    return;
  }
  if (!children.every((child) => {
    return child instanceof Element
  })){
    console.error(`${children} is not element array`)
    return
  }
  if (children.some((child) => {
    return !child.id
  })){
    console.error(`every child need id `)
    return
  }
  /**
   * sort children
   */
  let localChildren = children.sort((a,b) => {
    return a.offsetTop - b.offsetTop
  })
  /**
   * rebuild children node
   */
   let newChildren = []
   localChildren.forEach(child => {
    newChildren.push({
      id: child.id,
      scrollBottom: child.offsetTop - root.offsetTop +child.offsetHeight,
      scrollTop: child.offsetTop - root.offsetTop,
      expose: false
    })
  })
  for (let child of localChildren){
    child.expose = checkExpose(child.scrollTop,child.scrollBottom,root.clientHeight,root.scrollTop,root.offsetTop)
  }
  let fn = throttle()
  /**
   * get root and children dom
   */
  root.addEventListener('scroll',(e) => {
    fn(() => {
      for (let child of newChildren){
        let expose = checkExpose(child.scrollTop,child.scrollBottom,root.clientHeight,root.scrollTop,root.offsetTop)
        if (child.expose !== expose){
          window.dispatchEvent(new CustomEvent('domExpose',{
            'detail': {
              element: child,
              domExpose: expose
            },
            bubbles: false,
            cancelable: false
          }))
          child.expose = expose
        }
      }
    })
  })
}

const closeDomExpose = (root) => {
  root.removeEventListener('scroll')
}

export {
  DomExpose,
  closeDomExpose
}
