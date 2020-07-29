const Cookie = {
  setTime(d = 1) {
    return new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * d).toGMTString();
  },
  set(options) {
    const _default = {
      name: null,
      value: null,
      expires: this.setTime(),
      path: '/',
      domain: ''
    };
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        if (key === 'expires') {
          // 过期时间，此处按天计算
          _default[key] = this.setTime(options[key]);
        } else {
          _default[key] = options[key];
        }
      }
    }
    document.cookie = `${_default.name}=${encodeURI(_default.value)};expires=${_default.expires};path=${_default.path};domain=${_default.domain}`;
  },
  get(name) {
    const ck = document.cookie.split(';');
    const temp = {};
    ck.forEach(item => {
      const arr = item.trim().split('=');
      temp[arr[0]] = arr[1];
    });

    const value = temp[name];
    return decodeURI(value) || null;
  },
  remove(options) {
    const _default = {
      name: null,
      path: '/',
      domain: ''
    };
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        _default[key] = options[key];
      }
    }
    if (this.get(options.name)) {
      document.cookie = `${_default.name}=;expires=${new Date(0)};path=${_default.path};domain=${_default.domain}`;
    }
  }
};

export default Cookie;
