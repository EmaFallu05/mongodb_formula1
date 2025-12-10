import Router from "@koa/router";
import { teams } from "../mocks/teams";

const router = new Router({
  prefix: "/teams",
});

router.get("/", async (ctx) => {
  try {
    ctx.body = teams;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

router.get("/:teamId", async (ctx) => {
  try {
    const team = teams.find(
      (d) => d.teamId.toLowerCase() === ctx.params.teamId
    );
    if (!team) {
      ctx.status = 404;
      ctx.body = { message: "Team not found" };
      return;
    }
    ctx.status = 200;
    ctx.body = team;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

export default router;
