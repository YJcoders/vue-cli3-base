// 创建服务器
const express = require('express')
const app = express()

// 导入jsonwebtoken 生成token
const jwt = require('jsonwebtoken')
// JWT由三部分组成: header(头)、payload(载体)、signature(签名)
// jwt.sign(payload, secretOrPrivateKey, [options, callback])

// 连接数据库
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user',
  port: 3306
})
// 解析数据请求传的参数
const bodyparser = require('body-parser')
app.use(bodyparser.json()) // 解析post请求传来的application/json json格式参数 {a: '', b: ''}
app.use(bodyparser.urlencoded({ extended: false })) 
// 解析application/x-www-form-urlencoded UTF-8格式表单传来的数据 test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3

// 解决跨域 方式1：
// const cors = require('cors')
// app.use(cors())

// 跨域配置 方式2：请求头，请求方式设置
app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", '*')
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, access_token")
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Credentials", 'true') //可以带cookies
	// res.header("X-Powered-By", 'Express')
	if (req.method == 'OPTIONS') {
  	res.sendStatus(200)
	} else {
    next()
  }
  
})

// 登录拦截，token过期，跳转登录页
app.use((req, res, next) => {
  const token = req.headers.access_token
  if (req.path !== '/users/login' && token) {
    // 解析token
    const cert = jwt.verify(token, 'secret')
    if (cert.expiresIn < Date.now()) {
      res.status(403).send({status: 403, message: '登录过期，请重新登录'})
      return
    } else {
      next()
    }
  } else {
    next()
  }
})

// app.use(express.static('./public'))

// 发起请求

// 登录接口
app.post('/users/login', (req, res) => {
  // console.log(req.body, 'body')
  const payload = {
    username: req.body.username,
    expiresIn: (Math.floor(Date.now() / 1000) + 6000)*1000 // 10小时
  }
  const token = jwt.sign(payload, 'secret')

  const username = req.body.username
  const password = req.body.password
  const sqlUser = "select * from users where username = '"+username+"'"
  const sqlpassword = "select * from users where username = '"+username+"' and password = '"+password+"'"
  connection.query(sqlUser, (err, data) => {
    if (err) throw err
    if (!data.length) {
      res.send({status: 0, txt: '用户不存在'})
    } else {
      connection.query(sqlpassword, (err, data) => {
        if (err) throw err
        if (!data.length) {
          res.send({status: 1, txt: '密码不正确'})
        } else {
          res.send({status: 2, txt: '登录成功', token: token})
        } 
      })
    }
  })
  // res.send('请求成功')
})

// 获取用户详情
app.get('/users/detail', (req, res) => {
  // console.log(req.query, 777)
  const username = req.query.username
  const sqlUserDetail = "select * from details where username = '"+username+"'"
  connection.query(sqlUserDetail, (err, data) => {
    if (err) throw err
    res.send({userDetail: data[0]})
  })
})

// 启动服务
app.listen(3000, () => {
  console.log('端口启动: http://127.0.0.1:3000')
})