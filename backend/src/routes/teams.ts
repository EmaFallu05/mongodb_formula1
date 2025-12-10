import Router from "@koa/router";
import { teams } from "../mocks/teams";
import TeamsDao from "../dao/teams.dao";

const router = new Router({
  prefix: "/teams",
});

const teamsDao = new TeamsDao();

router.get("/", async (ctx) => {
  try {
    const teams = await teamsDao.getAll();
    ctx.body = teams;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

router.get("/:teamId", async (ctx) => {
  try {
    const { teamId } = ctx.params;
    const team = await teamsDao.getById(teamId);
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
