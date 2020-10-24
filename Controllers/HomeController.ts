import type { RouterContext } from '../deps.ts';

export const homeController = async (context: RouterContext) => {
    context.response.body = `
      <html>
        <body>
          <h2>RESTful API con Deno, MongoDb Atlas y desplieque en Heroku</h2>
        </body>
      </html>
      `
}