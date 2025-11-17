#!/bin/sh
# Build auth package first, then admin app
cd "$(dirname "$0")/../packages/auth" && npm run build
cd "../apps/admin" && npm run build
