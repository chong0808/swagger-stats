const Koa = require('koa')
const app = new Koa();
const bodyParser = require('koa-bodyparser')
var swStats = require('./../../lib');
const router = require('koa-router')()
// 配置ctx.body解析中间件
app.use(bodyParser())

// var apiSpec = require('swagger.json');
app.use(swStats.getMiddlewareKoa(app,{
  elasticsearch: "http://10.40.2.89:9200"
}));


router.post('/api', async ctx => {
  ctx.body = {
    success: true,
    data: {
      api: "1111"
    }
  }
})


router.get('/apiget', async ctx => {
  ctx.body = {
    success: true,
    data: {
      api: "1111"
    }
  }
})

router.get('/error', async ctx => {

  ctx.throw(400, 'name required');
})

router.get('/error_throw', async ctx => {
  throw new Error("Error")
})
router.post('/error_post', async ctx => {
  ctx.throw(400, 'name required');
})
app.use(router.routes()).use(router.allowedMethods())

app.listen(4040, '0.0.0.0');