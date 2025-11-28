import Koa from "koa";
import Router from "@koa/router";
import dotenv from "dotenv";

dotenv.config();
const app = new Koa();
const router = new Router();

router.get("/", (ctx) => {
  ctx.body = "Hello from Koa + TypeScript!";
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.BACKEND_PORT;

const back_domain = process.env.BACKEND_DOMAIN;
app.listen(port, () => {
  console.log(`Server running on ${back_domain}:${port}`);
});
