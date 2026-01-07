import path from "path";
import { createServer } from "./server";

const port = Number(process.env.PORT || 7000);
const openapi = path.resolve(__dirname, "../openapi.yaml");

const app = createServer(openapi);
app.listen({ port, host: "0.0.0.0" });