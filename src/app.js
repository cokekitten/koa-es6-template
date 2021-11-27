// 库导入
import Koa from 'koa'
import Router from 'koa-router'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'

// 路由导入
import indexRouter from './routes/index'
import usersRouter from './routes/users'

// 实例化
const app = new Koa()
const router = Router()

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
app.use(router.routes()).use(router.allowedMethods())
router.use(indexRouter.routes(), indexRouter.allowedMethods())
router.use(usersRouter.routes(), usersRouter.allowedMethods())

// error-handling 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

export default app
