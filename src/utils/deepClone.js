export default function deepClone(obj, cache = new WeakMap()) {
  // 判断是否是引用数据类型，基础数据类型本身就是地址拷贝
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj); // 处理时间函数
  if (obj instanceof RegExp) return new RegExp(obj); // 处理正则
  // 判断是否存在循环引用
  if (cache.get(obj)) return cache.get(obj);

  // 判断是数组还是对象
  const result = obj instanceof Array ? [] : {};
  //
  cache.set(obj, result);
  // 将每个源对象和拷贝的对象存到cache中，上面判断cache中是否存在循环引用
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      result[key] = deepClone(obj[key], cache);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
