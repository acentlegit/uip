#!/usr/bin/env bash
set -euo pipefail

echo "========================================="
echo "🚀 UIP — Build & Run All 18 Engines"
echo "========================================="

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# --------------------------------------------------
# 1. Install deps (workspace-aware)
# --------------------------------------------------
echo "📦 Installing dependencies..."
npm install

# --------------------------------------------------
# 2. Build shared core first
# --------------------------------------------------
echo "🧱 Building @uip/core..."
npm run build --workspace=@uip/core

# --------------------------------------------------
# 3. Build all engines
# --------------------------------------------------
echo "🏗️  Building all engines..."
npm run build --workspaces --if-present

# --------------------------------------------------
# 4. Start engines
# --------------------------------------------------
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

echo "🚀 Starting engines..."

i=0
for engine in "${ENGINES[@]}"; do
  PORT=$((BASE_PORT + i))
  i=$((i + 1))

  echo "▶️  ${engine}-engine on port ${PORT}"
  PORT=$PORT node "services/${engine}-engine/dist/index.js" &
done

echo ""
echo "========================================="
echo "✅ All 18 engines running"
echo "Health check example:"
echo "  curl http://localhost:7001/v1/health"
echo "Swagger example:"
echo "  http://localhost:7001/docs"
echo "========================================="

wait
