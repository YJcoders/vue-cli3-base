# vue3-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### git commit 拦截
```js
// 删除package.json下的
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
  }
},
```

