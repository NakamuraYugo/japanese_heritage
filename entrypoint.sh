#!/bin/bash
set -e

# 古いサーバーのPIDファイルを削除
rm -f /japanese-heritage/tmp/pids/server.pid

# ここに他の必要なコマンドを追加する

# コンテナのメインプロセスを実行
exec "$@"
