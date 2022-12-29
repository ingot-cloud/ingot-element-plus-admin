#!/usr/bin/env bash

source ./.local_env

INNER_VERSION=0.1.0
MODULE_NAME=ingot-admin

echo "开始打包${MODULE_NAME}:${INNER_VERSION}"

yarn build

docker login -u ${JY_DOCKER_REGISTRY_USERNAME} -p ${JY_DOCKER_REGISTRY_PASSWORD} docker-registry.wangchao.im

docker build -t docker-registry.wangchao.im/ingot/${MODULE_NAME}:${INNER_VERSION} .

docker push docker-registry.wangchao.im/ingot/${MODULE_NAME}:${INNER_VERSION}

echo "打包${MODULE_NAME}:${INNER_VERSION}完成"