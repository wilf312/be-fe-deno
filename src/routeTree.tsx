import { RootRoute, Route } from "@tanstack/react-router";
import { DinosaurList } from "./component/DinosaurList";
import { DinosaurDetail } from "./component/DinosaurDetail";
import { Layout } from "./component/Layout";

const rootRoute = new RootRoute({
  component: Layout,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DinosaurList,
});

const dinosaurRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "dinosaur/$name",
  component: DinosaurDetail,
});

export const routeTree = rootRoute.addChildren([indexRoute, dinosaurRoute]);

