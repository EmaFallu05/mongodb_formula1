import Router from "@koa/router";
import DriversDao from "../dao/drivers.dao";

const router = new Router({
  prefix: "/drivers",
});

const driversDao = new DriversDao();

//Get all drivers
router.get("/", async (ctx) => {
  try {
    const drivers = await driversDao.getAll();
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
    const driverId  = ctx.params.driverId;
    const driver = await driversDao.getById(driverId);

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
    const { country } = ctx.params;
    const filteredDrivers = await driversDao.getByCountry(country);
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
