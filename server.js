const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const logger = require('koa-logger');
const responseTime = require('koa-response-time');

const PORT = 5000;


// Load env variables
require('dotenv').config()

app.use(responseTime());
app.use(compress());
app.use(logger());
app.use(bodyParser());

router.get('/', async (ctx) => {
  ctx.body = "Hello World!";
});

app.use(router.routes());
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}. Hooray!`);
});
