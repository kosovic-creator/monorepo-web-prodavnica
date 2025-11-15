#!/bin/sh
# Symlink centralnog prisma foldera u svaki app za lokalni razvoj

set -e

ROOT_DIR="$(dirname "$0")"

for APP in apps/client apps/admin; do
  TARGET="$ROOT_DIR/$APP/prisma"
  SOURCE="$ROOT_DIR/prisma"
  if [ ! -L "$TARGET" ] && [ ! -d "$TARGET" ]; then
    ln -s ../../prisma "$TARGET"
    echo "Symlink created: $TARGET -> ../../prisma"
  else
    echo "Symlink or folder already exists: $TARGET"
  fi
done
