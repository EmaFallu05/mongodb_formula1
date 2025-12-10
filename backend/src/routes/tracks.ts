import Router from "@koa/router";
import TracksDao from "../dao/tracks.dao";

const router = new Router({
  prefix: "/tracks",
});

const tracksDao = new TracksDao();

router.get("/", async (ctx) => {
  try {
    const tracks = await tracksDao.getAll();
    ctx.status = 200;
    ctx.body = tracks;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

router.get("/country/:country", async (ctx) => {
  try {
    const { country } = ctx.params;
    const filteredTracks = await tracksDao.getByCountry(country);

    if (filteredTracks.length === 0) {
      ctx.status = 404;
      ctx.body = { message: "Nessuna pista trovata per questa nazione" };
      return;
    }

    ctx.status = 200;
    ctx.body = filteredTracks;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Errore nel server" };
  }
});

router.get("/status/:status", async (ctx) => {
  try {
    const rawStatus  = ctx.params.status;

    if (rawStatus !== "true" && rawStatus !== "false") {
      ctx.status = 400;
      ctx.body = { message: "Status non corretto, usa true o false" };
      return;
    }

    const isActive = rawStatus === "true";
    const result = await tracksDao.getStatus(isActive);

    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

router.get("/:trackName", async (ctx) => {
  try {
    const { trackName } = ctx.params;
    const tracks = await tracksDao.getByName(trackName);

    if (tracks.length === 0) {
      ctx.status = 404;
      ctx.body = { message: "Track not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = tracks;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

export default router;
