import Koa from "koa";
import Router from "@koa/router";
import dotenv from "dotenv";
import driverRoutes from "./routes/drivers";
import trackRoutes from "./routes/tracks";
import teamRoutes from "./routes/teams";
import { dbClient } from "./lib/db";

dotenv.config();
const app = new Koa();
const router = new Router();

dbClient();

router.get("/", (ctx) => {
  ctx.body = "Formula1";
}); 

app.use(router.routes());
app.use(router.allowedMethods());
app.use(driverRoutes.routes());
app.use(driverRoutes.allowedMethods());
app.use(trackRoutes.routes());
app.use(trackRoutes.allowedMethods());
app.use(teamRoutes.routes());
app.use(teamRoutes.allowedMethods());

const port = process.env.BACKEND_PORT;

const back_domain = process.env.BACKEND_DOMAIN;
app.listen(port, () => {
  console.log(`Server running on ${back_domain}:${port}`);
});
