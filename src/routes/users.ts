import * as express from 'express';
import * as winston from "winston";

export type UsersServiceConfig = {
  title: string,
  enabled: boolean,
  retries: number
};

export type UsersRouteEnv = {
  log: winston.Winston,
  config: UsersServiceConfig
}

export function buildRouter(env: UsersRouteEnv): express.Router {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    env.log.info("list users");
    res.send({
      result: [
        {name: "john"},
        {name: "steven"},
        {name: "bill"},
      ]
    })
  });

  router.get('/config', (req, res, next) => {
    res.send({config: env.config});
  });

  return router;
}
