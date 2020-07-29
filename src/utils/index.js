import Vue from 'vue';
import filters from './filter';

// 全局注册filter
Object.keys(filters).forEach(filter => Vue.filter(filter, filters[filter]));

export function getUrlParams(url) {
  if (!url) { return; }
  var result = '';
  var index = window.location.href.indexOf('?');
  var searchArr = window.location.href.slice(index + 1).split('&');
  searchArr.map(function(item) {
    var arr = item.split('=');
    if (arr[0] === url) {
      result = decodeURIComponent(arr[1]);
    }
  });
  return result;
}

// 匹配菜单外链 地址
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

// 根据id获取name
export function getNameById(id, array = [], nameKey = 'name', idKey = 'id') {
  let name = null;
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      if (String(array[i][idKey]) === String(id)) {
        name = array[i][nameKey];
        break;
      }
    }
    return name;
  }
  throw new Error(`${array} is required Array`);
}

