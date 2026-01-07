"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const routes_1 = __importDefault(require("./routes"));
function createServer(openapiPath) {
    const app = (0, fastify_1.default)({ logger: true });
    app.register(swagger_1.default, {
        mode: "static",
        specification: { path: openapiPath, baseDir: __dirname }
    });
    app.register(swagger_ui_1.default, { routePrefix: "/docs" });
    app.register(routes_1.default);
    return app;
}
