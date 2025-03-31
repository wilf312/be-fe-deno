import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { serveStatic } from "@hono/hono/deno";
import data from "./data.json" with { type: "json" };

const app = new Hono();

app.use("/", serveStatic({ root: "./dist" }));

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:8000",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 600,
  }),
);

app.get("/", (c) => {
  return c.text("Welcome to the dinosaur API!");
});

app.get("/api/dinosaurs", (c) => {
  return c.json(data);
});

app.get("/api/dinosaurs/:dinosaur", (c) => {
  if (!c.req.param("dinosaur")) {
    return c.text("No dinosaur name provided.");
  }

  const dinosaur = data.find((item) =>
    item.name.toLowerCase() === c.req.param("dinosaur").toLowerCase()
  );

  if (dinosaur) {
    return c.json(dinosaur);
  } else {
    return c.notFound();
  }
});

app.get('*', serveStatic({ root: './dist' }))


Deno.serve(app.fetch);
