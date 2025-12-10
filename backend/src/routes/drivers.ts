import Router from "@koa/router";
import { drivers } from "../mocks/drivers";

const router = new Router({
  prefix: "/drivers",
});

router.get("/", async (ctx) => {
  try {
    ctx.body = drivers;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

router.get("/:driverId", async (ctx) => {
  try {
    const driver = drivers.find((d) => d.driverId === ctx.params.driverId);
    if (!driver) {
      ctx.status = 404;
      ctx.body = { message: "Driver not found" };
      return;
    }
    ctx.status = 200;
    ctx.body = driver;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

export default router;
