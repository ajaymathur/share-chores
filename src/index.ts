import sequalise from './models/client';
import Koa from 'koa';
import Router from 'koa-router';
import { routes } from './routes';
import bodyParser from 'koa-bodyparser'

async function main() {
    const app = new Koa();
    const router = new Router();

    app.use(bodyParser());

    routes(router);
    
    app.use(router.routes()).use(router.allowedMethods());
  
    await sequalise.sync({ force: true });
    
    app.listen(3001);
    
}

main().catch(err => console.log(err))
