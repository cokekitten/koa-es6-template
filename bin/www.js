#!/usr/bin/env node

/**
 * Module dependencies.
 * 模块依赖
 */
const debug = require('debug')('demo:server')
const http = require('http')
const app = require('../src/app')

/**
 * 从环境变量中获取端口号，或直接设置端口号
 */
// eslint-disable-next-line no-use-before-define
const port = normalizePort(process.env.PORT || '3000')

/**
 * 创建 HTTP 服务器
 */
const server = http.createServer(app.callback())

/**
 * 将端口规范化为数字、字符串或 false
 */
function normalizePort(val) {
  // eslint-disable-next-line no-shadow
  const port = parseInt(val, 10)
  // named pipe 命名管道
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) return val
  // port number 端口号
  if (port >= 0) return port
  return false
}

/**
 * 错误事件-侦听器
 */
function onError(error) {
  if (error.syscall !== 'listen') throw error
  const bind = typeof port === 'string' ? `管道 ${port}` : `端口 ${port}`
  // 用友好的消息处理特定的监听错误
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} 需要提升权限`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} 已被使用`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * 侦听事件-侦听器
 */
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `管道 ${addr}` : `端口 ${addr.port}`
  debug(`监听在 ${bind}`)
  console.log(`Koa 启动成功，监听在 ${bind}，http://localhost:${addr.port}`)
}

/**
 * 启动 koa，并侦听端口
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
