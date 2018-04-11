const Koa = require('koa');
const Router = require('koa-router');

const db = require('./db');

const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const ratelimit = require('koa-ratelimit');
const Redis = require('ioredis');
const logger = require('koa-logger');
const responseTime = require('koa-response-time');
const AccessGrant = require('./api/accessGrants/model');


// Load env variables
require('dotenv').config()

var requireAuthToken = () => {
  return async(ctx, next) => {
    if (!ctx.header || !ctx.header.authorization) {
      ctx.throw(401, 'Authorization header not found')
    };
    const parts = ctx.header.authorization.split(' ');
    if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];
        let accessGrant  = await AccessGrant.query().where('token', credentials).eager('user')
        if (accessGrant.length > 0 && accessGrant[0].active) {
          ctx.state['user'] = accessGrant[0].user;
          return next();
        } else {
          ctx.throw(401)
        }
    } else {
      ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
    }
  }
}


function createServer(PORT) {
  const app = new Koa();
  const router = new Router();

  app.use(ratelimit({
    db: new Redis(process.env.REDIS_URL),
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


  app.use(require('./api/users').routes());
  app.use(requireAuthToken());
  app.use(require('./api/podcasts').routes());
  app.use(require('./api/episodes').routes());
  app.use(require('./api/subscriptions').routes());
  app.use(require('./api/accessGrants').routes());
  app.use(router.routes());
  return app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}. Hooray!`);
  });

}

module.exports = createServer;
