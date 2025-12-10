import Router from "@koa/router";
import { tracks } from "../mocks/tracks";

const router = new Router({
  prefix: "/tracks",
});
//Get all
router.get("/", async (ctx) => {
  try {
    ctx.body = tracks;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

//Get by ID
router.get("/:trackName", async (ctx) => {
  try {
    const track = tracks.find(
      (d) => d.name.toLowerCase() === ctx.params.trackName
    );
    if (!track) {
      ctx.status = 404;
      ctx.body = { message: "Track not found" };
      return;
    }
    ctx.status = 200;
    ctx.body = track;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

//Get by country
router.get("/country/:country", async (ctx) => {
  try {
    const nation = ctx.params.country.toLowerCase();
    const filteredTracks = tracks.filter(
      (d) => d.country.toLowerCase() === nation
    );
    if (filteredTracks.length === 0) {
      ctx.status = 404;
      ctx.body = { message: "Nessuna piosta trovata per questa nazione" };
      return;
    }
    ctx.status = 200;
    ctx.body = filteredTracks;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Errore nel server" };
  }
});


//Search by status
router.get("/status/:status", async (ctx) => {
  try {
    const status = ctx.params.status.toLowerCase();
    let result;
    if (status === "true") {
      result = tracks.filter((t) => t.is_active === true);
    } else if (status === "false") {
      result = tracks.filter((t) => t.is_active === false);
    } else {
      ctx.status = 400;
      ctx.body = { message: "Status non corretto" };
      return;
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
});

export default router;
