(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.res = {}));
}(this, (function (exports) { 'use strict';

  /**
  * 节流
  */
  const throttle = function (time = 1) {
    let date = null;
    return fn => {
      let newTime = new Date().getTime();

      if (newTime > date + time * 300 || !date) {
        date = newTime;
        fn();
      }
    };
  };
  const checkExpose = (childScrollTop, childScrollBottom, clientHeight, scrollTop) => {
    if (childScrollTop > scrollTop + clientHeight && childScrollBottom > scrollTop) {
      return false;
    }

    return true;
  };

  /**
   * dom expose check
   * @param root {Element}
   * @param children {Element[]}
   */

  const DomExpose = (root, children) => {
    console.log(root, children);
    /**
     * check
     */

    if (!(root instanceof Element)) {
      console.error(`${root} is not element`);
      return;
    }

    if (!Array.isArray(children)) {
      console.error(`${children} is not array`);
      return;
    }

    if (!children.every(child => {
      return child instanceof Element;
    })) {
      console.error(`${children} is not element array`);
      return;
    }
    /**
     * sort children
     */


    let localChildren = children.sort((a, b) => {
      return a.offsetTop - b.offsetTop;
    });
    console.log('localChildren', localChildren);
    /**
     * rebuild children node
     */

    let newChildren = [];
    localChildren.forEach(child => {
      newChildren.push({
        id: child.id,
        scrollBottom: child.offsetTop - root.offsetTop + child.offsetHeight,
        scrollTop: child.offsetTop - root.offsetTop,
        expose: false
      });
    });
    console.log('localChildren2', newChildren);
    const clientHeight = root.clientHeight;
    const scrollTop = root.scrollTop;
    const offsetTop = root.offsetTop;

    for (let child of localChildren) {
      if (child.scrollTop < scrollTop + clientHeight) {
        child.expose = false;
        continue;
      }

      if (child.scrollBottom > scrollTop) {
        child.expose = false;
        continue;
      }

      child.expose = true;
    }

    let fn = throttle();
    /**
     * get root and children dom
     */

    root.addEventListener('scroll', e => {
      fn(() => {
        for (let child of newChildren) {
          let expose = checkExpose(child.scrollTop, child.scrollBottom, clientHeight, root.scrollTop);

          if (child.expose !== expose) {
            window.dispatchEvent(new CustomEvent('domExpose', {
              'detail': {
                element: child,
                domExpose: expose
              },
              bubbles: false,
              cancelable: false
            }));
            child.expose = expose;
          }
        }
      });
    });
  };

  const closeDomExpose = root => {
    root.removeEventListener('scroll');
  };

  exports.DomExpose = DomExpose;
  exports.closeDomExpose = closeDomExpose;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.js.map
