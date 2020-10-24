import { 
  Application, 
} from "./deps.ts";

import logger from './Middlewares/logger.ts';
import header from './Middlewares/header.ts';
import notFound from './Middlewares/notFound.ts';
import errorHandler from './Middlewares/errorHandler.ts';
import { userRouter } from './Routes/UserRouter.ts';
import { homeRouter } from './Routes/HomeRouter.ts';

const app = new Application();
const puerto = 8000;

app.use( logger );
app.use( header );
app.use( errorHandler );

app.use(homeRouter.routes());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

console.log(`Deno se esta ejecutando en http://localhost:${puerto}`);
app.use( notFound );
await app.listen({ port: puerto });