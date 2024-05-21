#!/bin/bash

echo ""  # 打印一个空行

for dir in */; do
  echo "## ${dir}"  # 使用当前目录名作为标题
  echo ""  # 打印一个空行
  for file in "${dir}"*.md; do
    if [ -f "$file" ]; then
      filename=$(basename "$file")
      title="${filename%.*}"
      echo "* [$title]($file)"
    fi
  done
  echo ""  # 打印一个空行
done
