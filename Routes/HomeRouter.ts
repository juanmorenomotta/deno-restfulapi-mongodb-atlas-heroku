import { 
  Router 
} from '../deps.ts';

import { 
  homeController 
} from '../controllers/HomeController.ts';

const homeRouter = new Router();

homeRouter.get("/", homeController);

export { homeRouter };