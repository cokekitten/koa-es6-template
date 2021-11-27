// 库导入
const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 路由导入
const index = require('./routes/index')
const users = require('./routes/users')

// 实例化
const app = new Koa()

// error handler 错误处理
onerror(app)

// middlewares 中间件
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(`${__dirname}/public`))

app.use(
  views(`${__dirname}/views`, {
    extension: 'pug',
  })
)

// logger 日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes 注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
