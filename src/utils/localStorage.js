class Storage {
  set(key, value, expires) {
    let time;
    if (!isNaN(Number(expires))) {
      // 存储时间按天计算
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * expires;
      console.log(time, 1);
    } else {
      // 默认存储一个月
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 30;
      console.log(time, 2);
    }
    const obj = {
      data: value,
      expires: time
    };
    window.localStorage.setItem(key, JSON.stringify(obj));
  }
  get(key) {
    const obj = window.localStorage.getItem(key);
    if (!obj) return null;
    const data = JSON.parse(obj);
    // 判断是否过期
    const now = new Date().getTime();
    if (now > data.expires) {
      // 已过期
      this.remove(key);
      return null;
    } else {
      return data.data;
    }
  }
  remove(key) {
    const obj = window.localStorage.getItem(key);
    if (!obj) return null;
    window.localStorage.removeItem(key);
  }
}
const storage = new Storage();
export default storage;
