export default function deepClone(obj, cache = []) {
  // 判断是否是引用数据类型，基础数据类型本身就是地址拷贝
  if (obj === null || typeof obj !== 'object') return obj;
  // 判断是否存在循环引用
  const hit = find(cache, c => c.original === obj);
  // 出现循环引用之后，如果允许循环引用
  if (hit) {
    return hit.result;
  }
  // 如果不允许
  // if (hit) return new Error('对象存在循环引用')

  // 判断是数组还是对象
  const result = obj instanceof Array ? [] : {};
  // 将每个源对象和拷贝的对象存到cache中，上面判断cache中是否存在循环引用
  cache.push({
    original: obj,
    result
  });
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      result[key] = deepClone(obj[key], cache);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
