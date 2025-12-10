import Router from "@koa/router";
import { drivers } from "../mocks/drivers";

const router = new Router({
  prefix: "/drivers",
});

//Get all drivers
router.get("/", async (ctx) => {
  try {
    ctx.body = drivers;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

//Get driver by ID
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

//Get country by driver
router.get("/country/:country", async (ctx) => {
  try {
    const nation = ctx.params.country.toLowerCase();
    const filteredDrivers = drivers.filter(
      (d) => d.country.toLowerCase() === nation
    );
    if (filteredDrivers.length === 0) {
      ctx.status = 404;
      ctx.body = { message: "Nessun pilota trovato per questa nazione" };
      return;
    }
    ctx.status = 200;
    ctx.body = filteredDrivers;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Errore nel server" };
  }
});

export default router;
