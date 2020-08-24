/**
 * 拖动指令
 *
 */

//import { on } from '@/libs/tools';
/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (!!document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (!!document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
export default {
  inserted: (el, binding, vnode) => {
    let triggerDom = document.querySelector(binding.value.trigger);
    triggerDom.style.cursor = 'move';
    let bodyDom = document.querySelector(binding.value.body);
    let pageX = 0;
    let pageY = 0;
    let transformX = 0;
    let transformY = 0;
    let canMove = false;
    const handleMousedown = (e) => {
      let transform = /\(.*\)/.exec(bodyDom.style.transform);
      if (transform) {
        transform = transform[0].slice(1, transform[0].length - 1);
        let splitxy = transform.split('px, ');
        transformX = parseFloat(splitxy[0]);
        transformY = parseFloat(splitxy[1].split('px')[0]);
      }
      pageX = e.pageX;
      pageY = e.pageY;
      canMove = true;
    };
    const handleMousemove = (e) => {
      let xOffset = e.pageX - pageX + transformX;
      let yOffset = e.pageY - pageY + transformY;
      if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    };
    const handleMouseup = (e) => {
      canMove = false;
    };
    on(triggerDom, 'mousedown', handleMousedown);
    on(document, 'mousemove', handleMousemove);
    on(document, 'mouseup', handleMouseup);
  },
  update: (el, binding, vnode) => {
    if (!binding.value.recover) return;
    let bodyDom = document.querySelector(binding.value.body);
    bodyDom.style.transform = '';
  },
};
