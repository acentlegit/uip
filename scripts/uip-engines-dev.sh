#!/usr/bin/env bash
set -euo pipefail

echo "========================================="
echo "🚀 UIP — Build & Run All 18 Engines (DEV)"
echo "========================================="

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OPENAPI_DIR="$ROOT_DIR/openapi"
RUNTIME_DIR="$ROOT_DIR/.uip-engine-runtime"
BASE_PORT=7001

ENGINES=(
  intent
  compliance
  policy
  risk
  explainability
  routing
  integration
  evidence
  identity
  tenancy
  quota
  pricing
  versioning
  change
  ai
  simulation
  appeals
  learning
)

# --------------------------------------------------
# 1. Verify OpenAPI completeness
# --------------------------------------------------
echo "🔎 Verifying OpenAPI specs..."

for engine in "${ENGINES[@]}"; do
  if [[ ! -f "$OPENAPI_DIR/${engine}.yaml" && ! -f "$OPENAPI_DIR/${engine}.openapi.yaml" ]]; then
    echo "❌ Missing OpenAPI spec for engine: $engine"
    exit 1
  fi
done

echo "✅ All OpenAPI specs present"

# --------------------------------------------------
# 2. Prepare ephemeral runtime (never committed)
# --------------------------------------------------
echo "🧹 Preparing ephemeral runtime..."
rm -rf "$RUNTIME_DIR"
mkdir -p "$RUNTIME_DIR"

# --------------------------------------------------
# 3. Runtime package.json
# --------------------------------------------------
cat > "$RUNTIME_DIR/package.json" <<'EOF'
{
  "name": "uip-engine-runtime",
  "private": true,
  "type": "commonjs",
  "dependencies": {
    "fastify": "^4.27.0",
    "@fastify/swagger": "^8.15.0",
    "@fastify/swagger-ui": "^2.1.0"
  }
}
EOF

# --------------------------------------------------
# 4. Runtime engine launcher (Swagger-correct)
# --------------------------------------------------
cat > "$RUNTIME_DIR/engine.js" <<'EOF'
const Fastify = require("fastify");
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");
const fs = require("fs");
const path = require("path");

const engine = process.argv[2];
const port = Number(process.argv[3]);
const openapiDir = process.argv[4];

const specPath = [
  path.join(openapiDir, `${engine}.yaml`),
  path.join(openapiDir, `${engine}.openapi.yaml`)
].find(p => fs.existsSync(p));

if (!specPath) {
  console.error(`❌ OpenAPI spec not found for ${engine}`);
  process.exit(1);
}

const app = Fastify({ logger: false });

app.register(swagger, {
  mode: "static",
  specification: {
    path: specPath,
    baseDir: openapiDir
  }
});

app.register(swaggerUI, {
  routePrefix: `/${engine}/v1/docs`,
  uiConfig: {
    docExpansion: "list",
    deepLinking: true
  }
});

app.get(`/${engine}/v1/health`, async () => ({
  engine,
  status: "ok"
}));

app.listen({ port, host: "0.0.0.0" }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`✅ ${engine} engine running on port ${port}`);
});
EOF

# --------------------------------------------------
# 5. Install runtime deps
# --------------------------------------------------
echo "⬇️ Installing runtime dependencies..."
cd "$RUNTIME_DIR"
npm install --silent
cd "$ROOT_DIR"

# --------------------------------------------------
# 6. Start all engines
# --------------------------------------------------
echo "🚀 Starting all 18 engines..."

i=0
for engine in "${ENGINES[@]}"; do
  port=$((BASE_PORT + i))
  i=$((i + 1))
  node "$RUNTIME_DIR/engine.js" "$engine" "$port" "$OPENAPI_DIR" &
done

echo ""
echo "========================================="
echo "✅ All 18 engines running"
echo ""
echo "Swagger UIs:"
i=0
for engine in "${ENGINES[@]}"; do
  port=$((BASE_PORT + i))
  i=$((i + 1))
  echo "  http://localhost:${port}/${engine}/v1/docs"
done
echo ""
echo "Press Ctrl+C to stop"
echo "========================================="

wait

