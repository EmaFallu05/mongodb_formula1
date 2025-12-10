import Router from "@koa/router";
import { tracks } from "../mocks/tracks";

const router = new Router({
  prefix: "/tracks",
});

router.get("/", async (ctx) => {
  try {
    ctx.body = tracks;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

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

export default router;
