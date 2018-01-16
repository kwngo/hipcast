const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const db = require('./db');

const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const ratelimit = require('koa-ratelimit');
const Redis = require('ioredis');
const logger = require('koa-logger');
const responseTime = require('koa-response-time');

const PORT = 5000;

// Load env variables
require('dotenv').config()

app.use(ratelimit({
  db: new Redis(),
  duration: 60000,
  errorMessage: 'Sometimes You Just Have to Slow Down.',
  id: (ctx) => ctx.ip,
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total'
  },
  max: 100
}));


app.use(responseTime());
app.use(compress());
app.use(logger());
app.use(bodyParser());

router.get('/', async (ctx) => {
  ctx.body = "Hello World!";
});

app.use(require('./api/podcasts').routes());
app.use(require('./api/episodes').routes());
app.use(router.routes());
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}. Hooray!`);
});
