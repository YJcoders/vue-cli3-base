
// export default function throttle(func, wait, options) {
//   var context, args, result;
//   var timeout = null;
//   // 之前的时间戳
//   var previous = 0;
//   // 如果 options 没传则设为空对象
//   if (!options) options = {};
//   // 定时器回调函数
//   var later = function() {
//     // 如果设置了 leading，就将 previous 设为 0
//     // 用于下面函数的第一个 if 判断
//     previous = options.leading === false ? 0 : new Date();
//     // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
//     timeout = null;
//     result = func.apply(context, args);
//     if (!timeout) context = args = null;
//   };
//   return function() {
//     // 获得当前时间戳
//     var now = new Date();
//     // 首次进入前者肯定为 true
//     // 如果需要第一次不执行函数
//     // 就将上次时间戳设为当前的
//     // 这样在接下来计算 remaining 的值时会大于0
//     if (!previous && options.leading === false) previous = now;
//     // 计算剩余时间
//     var remaining = wait - (now - previous);
//     context = this;
//     args = arguments;
//     // 如果当前调用已经大于上次调用时间 + wait
//     // 或者用户手动调了时间
//     // 如果设置了 trailing，只会进入这个条件
//     // 如果没有设置 leading，那么第一次会进入这个条件
//     // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
//     // 其实还是会进入的，因为定时器的延时
//     // 并不是准确的时间，很可能你设置了2秒
//     // 但是他需要2.2秒才触发，这时候就会进入这个条件
//     if (remaining <= 0 || remaining > wait) {
//       // 如果存在定时器就清理掉否则会调用二次回调
//       if (timeout) {
//         clearTimeout(timeout);
//         timeout = null;
//       }
//       previous = now;
//       result = func.apply(context, args);
//       if (!timeout) context = args = null;
//     } else if (!timeout && options.trailing !== false) {
//       // 判断是否设置了定时器和 trailing
//     // 没有的话就开启一个定时器
//       // 并且不能不能同时设置 leading 和 trailing
//       timeout = setTimeout(later, remaining);
//     }
//     return result;
//   };
// }

// export default function debounce(func, wait, immediate) {
//   let timer;
//   let result;
//   const debounced = function(...args) {
//     if (timer) clearTimeout(timer);
//     // 如果立即执行
//     if (immediate) {
//       var callNow = !timer;
//       timer = setTimeout(() => {
//         // func.apply(this, args)
//         timer = null;
//       }, wait);

//       if (callNow) result = func.apply(this, args);
//     } else {
//       timer = setTimeout(() => {
//         func.apply(this, args);
//       }, wait);
//     }
//     return result;
//   };

//   debounced.cancel = function() {
//     clearTimeout(timer);
//     timer = null;
//   };

//   return debounced;
// }

export default function throttle(func, wait, options) {
  let timer;
  let previous = 0;
  if (!options) options = {};
  return function(...args) {
    const now = new Date().getTime();

    //
    // 控制是否，一进入就执行
    if (!previous && options.leading === false) previous = now;

    if (now - previous > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      func.apply(this, args);
      previous = now;
    } else if (!timer && options.trailing !== false) {
      // 控制离开后是否还执行最后一次
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
        previous = new Date().getTime();
      }, wait);
    }
  };
}
