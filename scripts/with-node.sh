#!/bin/sh

set -eu

if ! command -v node >/dev/null 2>&1; then
  user_home_dir="/Users/$(id -un)"

  for node_dir in \
    "$user_home_dir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin" \
    "/opt/homebrew/bin" \
    "/usr/local/bin"
  do
    if [ -x "$node_dir/node" ]; then
      PATH="$node_dir:$PATH"
      export PATH
      break
    fi
  done
fi

if ! command -v node >/dev/null 2>&1; then
  echo "未找到 Node.js。请安装 Node.js 22 或更高版本后重试。" >&2
  exit 1
fi

export WRANGLER_LOG_PATH=.wrangler/wrangler.log
exec "$@"
