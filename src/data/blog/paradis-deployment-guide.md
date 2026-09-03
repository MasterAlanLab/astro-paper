---
author: 艾伦
pubDatetime: 2026-08-11T22:00:00+08:00
title: Paradis 部署教程：使用 Docker Compose 搭建 AI 订阅代充平台
featured: false
draft: true
categories:
  - AI 技术
tags:
  - Paradis
  - Docker
  - Docker Compose
  - PostgreSQL
description: 从服务器准备、生产环境变量、PostgreSQL 持久化到 HTTPS 反向代理，完整介绍 Paradis 的单机生产部署流程。
---

## Paradis 是什么

Paradis 是一个面向 AI 订阅代充场景的自托管平台，包含用户自助充值页面、合伙人控制台和平台管理后台。用户拿到卡密后，可以在公开页面提交目标账户信息；平台则负责校验卡密、创建订单、排队执行订阅并展示处理进度。

Paradis 的前端使用 React，后端使用 Go。官方镜像已经把前后端打包在同一个容器里，部署时再配合 PostgreSQL 即可运行。本文采用下面这套结构：

```text
互联网
  │
  ▼
Caddy / Nginx（HTTPS，80/443）
  │
  ▼
Paradis（仅监听宿主机 127.0.0.1:1323）
  │
  ▼
PostgreSQL（仅在 Docker 内部网络访问）
```

这种方式适合单台 Linux 服务器，也是最容易维护的生产部署方案。

如果想在部署前看看 Paradis 实际运行起来是什么样子，可以访问作者部署的 AI 订阅代充平台：[ai.corouter.cc](https://ai.corouter.cc/)。不想自己准备服务器、域名和数据库的话，也可以直接在这里使用现成服务。

## 部署前准备

开始之前，需要准备：

- 一台安装了 Docker Engine 和 Docker Compose v2 的 Linux 服务器；
- 一个已经解析到服务器公网 IP 的域名；
- Caddy、Nginx、Traefik 或云负载均衡，用于提供 HTTPS；
- 能够访问 ChatGPT、Stripe 和 Captcha.run 的出站网络；
- 至少一个可用的 Paradis 镜像版本号。

Paradis 的公开镜像地址为：

```text
ghcr.io/masteralanlab/paradis
```

镜像支持 `linux/amd64` 和 `linux/arm64`，但不会发布 `latest` 标签。部署前请打开 [GHCR 镜像版本列表](https://github.com/MasterAlanLab/Paradis/pkgs/container/paradis/versions)，选择一个明确存在的版本。本文使用 `v0.0.35` 演示，实际部署时可以换成更新的稳定版本。

## 第一步：创建部署目录

登录服务器后创建独立目录：

```bash
sudo mkdir -p /opt/paradis/logs
sudo chown -R "$USER":"$USER" /opt/paradis
cd /opt/paradis
```

后面的 `docker-compose.yml`、`.env` 和应用日志都放在这个目录中。数据库则使用 Docker 命名卷持久化。

## 第二步：编写 Docker Compose 配置

在 `/opt/paradis` 中创建 `docker-compose.yml`：

```yaml
name: paradis

services:
  app:
    image: ${APP_IMAGE:?请在 .env 中设置带有实际发布标签的 APP_IMAGE}
    container_name: paradis-app
    env_file:
      - .env
    ports:
      - "127.0.0.1:1323:1323"
    environment:
      APP_ENV: production
      SERVER_HOST: 0.0.0.0
      SERVER_PORT: 1323
      DB_DRIVER: postgres
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: ${DB_USERNAME:-paradis}
      DB_PASSWORD: ${DB_PASSWORD:?请在 .env 中设置 DB_PASSWORD}
      DB_NAME: ${DB_NAME:-paradis}
      DB_SSLMODE: disable
      LOG_DIR: /app/logs
    volumes:
      - ./logs:/app/logs
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped
    stop_grace_period: 30s
    healthcheck:
      test:
        - CMD
        - wget
        - --quiet
        - --tries=1
        - --output-document=/dev/null
        - http://localhost:1323/api/v1/health
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: json-file
      options:
        max-size: "20m"
        max-file: "5"

  postgres:
    image: postgres:17-alpine
    container_name: paradis-postgres
    environment:
      POSTGRES_DB: ${DB_NAME:-paradis}
      POSTGRES_USER: ${DB_USERNAME:-paradis}
      POSTGRES_PASSWORD: ${DB_PASSWORD:?请在 .env 中设置 DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 12
      start_period: 10s
    logging:
      driver: json-file
      options:
        max-size: "20m"
        max-file: "5"

volumes:
  postgres_data:

networks:
  default:
    name: paradis-network
```

这份配置有几个需要注意的地方：

- Paradis 只映射到宿主机的 `127.0.0.1:1323`，不会直接暴露到公网；
- PostgreSQL 没有映射宿主机端口，只允许同一 Docker 网络内的 Paradis 访问；
- PostgreSQL 数据保存在 `postgres_data` 命名卷中；
- 应用日志保存在 `/opt/paradis/logs`；
- 两个容器都启用了健康检查和自动重启；
- 容器标准输出设置了大小和数量限制，避免长期运行耗尽磁盘。

## 第三步：生成生产环境密钥

生产环境需要为数据库、Cookie、加密存储和摘要分别准备随机值。可以逐条运行下面的命令：

```bash
# PostgreSQL 密码
openssl rand -hex 24

# Cookie 签名密钥，输出 64 个字符
openssl rand -hex 32

# Cookie 加密密钥，输出 32 个 ASCII 字节
openssl rand -hex 16

# 数据加密密钥，32 个随机字节的 Base64 编码
openssl rand -base64 32

# 卡密、Token 和卡片指纹摘要使用的 pepper
openssl rand -hex 32

# 管理员和初始合伙人的密码，各执行一次
openssl rand -base64 24
```

把每次输出分别保存好，不要在数据库密码、Cookie 密钥和数据加密密钥之间复用同一个值。

其中 `DATA_ENCRYPTION_KEY_V1` 尤其重要。Paradis 会用它加密卡片凭据、卡密、Session 和后台敏感设置。首次部署后必须保持不变，并额外做一份离线备份。这个值丢失后，即使数据库还在，已有密文也将失去可用的解密密钥。

## 第四步：配置 `.env`

在 `/opt/paradis` 中创建 `.env`：

```env
APP_IMAGE=ghcr.io/masteralanlab/paradis:v0.0.35
APP_ENV=production

PUBLIC_BASE_URL=https://paradis.example.com
CORS_ALLOWED_ORIGINS=https://paradis.example.com
TRUSTED_PROXY_CIDRS=

DB_USERNAME=paradis
DB_PASSWORD=REPLACE_WITH_RANDOM_POSTGRES_PASSWORD
DB_NAME=paradis

SESSION_SECRET=REPLACE_WITH_AT_LEAST_32_RANDOM_CHARACTERS
SESSION_ENCRYPTION_KEY=REPLACE_WITH_EXACTLY_16_24_OR_32_BYTES
DATA_ENCRYPTION_KEY_V1=REPLACE_WITH_BASE64_ENCODED_32_BYTE_KEY
CARD_KEY_HASH_PEPPER=REPLACE_WITH_RANDOM_SECRET

BOOTSTRAP_ADMIN_USERNAME=admin
BOOTSTRAP_ADMIN_PASSWORD=REPLACE_WITH_A_STRONG_PASSWORD
BOOTSTRAP_PARTNER_TENANT_NAME=初始合伙人
BOOTSTRAP_PARTNER_USERNAME=partner
BOOTSTRAP_PARTNER_PASSWORD=REPLACE_WITH_ANOTHER_STRONG_PASSWORD
```

请完成下面这些替换：

1. 把 `APP_IMAGE` 的标签换成准备部署的实际版本；
2. 把两个 `paradis.example.com` 换成自己的域名，保留 `https://`，结尾不要添加路径；
3. 填入上一步生成的数据库密码和四项安全密钥；
4. 为管理员和初始合伙人设置不同的强密码；
5. 确保 `CORS_ALLOWED_ORIGINS` 只填写真实前端来源，不要使用 `*`。

然后限制配置文件权限：

```bash
chmod 600 /opt/paradis/.env
```

Paradis 首次启动时会幂等创建管理员和初始合伙人。如果账号已经存在，后续重启不会用 `.env` 覆盖密码。确认两个账号都能正常登录并且密码已经妥善保存后，可以从 `.env` 中删除这两行：

```env
BOOTSTRAP_ADMIN_PASSWORD=...
BOOTSTRAP_PARTNER_PASSWORD=...
```

## 第五步：启动 Paradis

确认当前目录中已经有 `docker-compose.yml` 和 `.env`，然后执行：

```bash
cd /opt/paradis
docker compose config --quiet
docker compose pull
docker compose up -d
docker compose ps
```

第一次启动时，Paradis 会自动初始化数据库结构、基础套餐、业务规则和初始账号。等待容器进入健康状态后，在服务器本机检查接口：

```bash
curl -fsS http://127.0.0.1:1323/api/v1/health
```

如果命令正常返回，说明应用和数据库已经启动。此时服务还只在服务器本机开放，下一步需要配置 HTTPS 入口。

## 第六步：配置 HTTPS 反向代理

生产模式会启用 Secure Cookie，因此公网入口必须使用 HTTPS。下面以安装在宿主机上的 Caddy 为例。

编辑 Caddy 配置：

```caddyfile
paradis.example.com {
    encode zstd gzip
    reverse_proxy 127.0.0.1:1323
}
```

替换域名后重新加载 Caddy。Caddy 会自动申请和续期 HTTPS 证书。完成后可以访问：

- 用户充值页面：`https://你的域名/`
- 控制台登录页：`https://你的域名/login`
- 健康检查：`https://你的域名/api/v1/health`

如果使用 Nginx 或云负载均衡，同样需要把 HTTPS 请求转发到 `127.0.0.1:1323`，并正确传递 Host、协议和客户端地址信息。

服务器防火墙只需要对公网开放 `80/443`。SSH 端口建议限制来源地址，`1323` 和 `5432` 都不应直接对公网开放。

## 第七步：设置可信反向代理

Paradis 默认只信任 TCP 对端地址，不会直接采信客户端自行提交的转发头。这可以避免有人伪造来源 IP，但通过反向代理部署后，还需要让应用识别真实客户端地址，才能让限流和审计按预期工作。

先查看 Compose 网络：

```bash
docker network inspect paradis-network
```

根据实际网络信息，把 `.env` 中的 `TRUSTED_PROXY_CIDRS` 设置为反向代理的实际地址或受控 Docker 网络 CIDR。多个值使用英文逗号分隔，例如：

```env
TRUSTED_PROXY_CIDRS=172.20.0.0/16
```

这里的地址只是格式示例，必须以服务器实际创建的网络为准。修改后重新创建应用容器：

```bash
docker compose up -d app
```

不要为了省事填写任意公网网段。反向代理也应覆盖客户端传入的转发头，而不是原样透传不可信值。

## 第八步：完成后台设置

容器健康只代表基础服务已经运行。首次登录管理员控制台后，还要继续完成业务配置：

### 系统设置

填写 Captcha.run 密钥，并根据实际业务配置动态代理提取接口和易支付参数。Captcha.run 密钥缺失不会阻止容器启动，但真实代充订单会在执行阶段失败。

这些敏感配置应直接在管理员后台填写，由 Paradis 加密保存，不需要写进 Docker Compose 或公开的部署文档。

### 地区与定价

启用需要支持的支付地区，并检查不同套餐在各地区的报价。正式营业前，应使用少量测试订单验证卡片、账单地址、地区和套餐之间是否匹配。

### 合伙人管理

根据实际运营方式新增、审核或停用合伙人，并设置积分。管理员拥有全局数据范围，合伙人只能访问自己租户下的卡片、卡密、订单和积分记录。

## 生产环境安全检查

正式对外开放前，建议逐项检查：

- [ ] `APP_ENV` 已设置为 `production`；
- [ ] 使用明确的镜像版本标签，而不是浮动标签；
- [ ] `.env` 权限已经设置为 `600`；
- [ ] 数据库、Cookie 和数据加密分别使用独立随机值；
- [ ] `DATA_ENCRYPTION_KEY_V1` 已经离线备份；
- [ ] `CORS_ALLOWED_ORIGINS` 只包含真实站点来源；
- [ ] `1323` 和 `5432` 没有直接暴露到公网；
- [ ] 公网入口已经启用 HTTPS；
- [ ] `TRUSTED_PROXY_CIDRS` 只包含受控代理地址；
- [ ] 初始账号密码已保存，并已从 `.env` 删除两个初始化密码；
- [ ] 管理员后台中的支付、代理、地区和套餐配置已经完成；
- [ ] 已经用少量订单跑通完整流程；
- [ ] 已经建立数据库和关键密钥的备份机制。

## 数据库备份

Paradis 的业务数据保存在 PostgreSQL 中。可以使用下面的命令创建 SQL 备份：

```bash
cd /opt/paradis
docker compose exec -T postgres \
  sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' \
  > "paradis-$(date +%F-%H%M%S).sql"
```

备份文件中可能包含敏感业务数据，应加密后再传到异地存储，并限制读取权限。除了数据库，还要单独备份 `.env` 中的数据加密密钥。数据库备份和密钥缺少任何一项，都不足以完整恢复已有数据。

建议在每次升级前手动备份，并通过定时任务做周期性备份。不要只保存在运行 Paradis 的同一块磁盘上。

## 升级 Paradis

升级前先查看 [GHCR 镜像版本列表](https://github.com/MasterAlanLab/Paradis/pkgs/container/paradis/versions)，确认目标版本存在，然后：

1. 备份 PostgreSQL；
2. 备份当前 `.env` 和数据加密密钥；
3. 修改 `.env` 中的 `APP_IMAGE` 版本标签；
4. 拉取镜像并重新创建应用容器；
5. 检查容器和健康接口。

对应命令如下：

```bash
cd /opt/paradis
docker compose pull app
docker compose up -d app
docker compose ps
curl -fsS http://127.0.0.1:1323/api/v1/health
```

应用启动时会按当前模型初始化数据库结构并执行一致性检查。不要让不同版本的 Paradis 长期同时连接同一个数据库并消费订单队列。如果某个版本包含数据库结构变化，回退时应同时恢复与旧版本匹配的数据库备份。

## 常见问题

### 容器一直处于 unhealthy 怎么办？

先检查 `docker compose ps`，确认 PostgreSQL 是否已经健康，再核对 `.env` 中的数据库密码、密钥长度和镜像版本。也可以查看最近的容器输出定位启动校验错误：

```bash
docker compose logs --tail=100 app postgres
```

### 本机健康检查正常，但域名打不开怎么办？

依次检查域名解析、服务器安全组、防火墙、Caddy 或 Nginx 状态，以及 `80/443` 端口是否已经被正确监听。Paradis 使用生产模式时，浏览器入口应始终通过 HTTPS 访问。

### 登录后很快掉线或出现跨域错误怎么办？

检查 `PUBLIC_BASE_URL` 和 `CORS_ALLOWED_ORIGINS` 是否与浏览器地址完全一致，包括协议、域名和端口。不要把一个写成 HTTP，另一个写成 HTTPS。

### 容器正常，订单却执行失败怎么办？

容器健康检查只验证应用和数据库是否可用。订单还依赖服务器出站网络、Captcha.run 密钥、代理、支付地区、套餐报价和支付卡信息。进入管理员后台逐项检查，并先用少量订单验证完整链路。

### 修改后台设置后需要重启吗？

后台敏感设置修改后会对新订单生效，通常不需要重启容器。修改 `.env` 中的运行参数后，则应执行 `docker compose up -d app` 重新创建应用容器。

## 总结

Paradis 的生产部署可以概括为四个核心部分：使用固定版本的官方镜像、使用 PostgreSQL 持久化业务数据、通过 HTTPS 反向代理提供公网入口，以及妥善保存生产密钥。

部署完成后，别急着立刻对外开放。先登录管理员后台补齐 Captcha.run、代理、支付地区和套餐配置，再用少量订单完成端到端验证。最后建立数据库与密钥备份，后续升级时坚持“先备份、再换版本、最后检查健康状态”，就能把单机实例维护得更加稳定。

如果你只是需要 AI 订阅代充服务，并不打算长期维护自己的服务器，也可以直接使用作者运营的 [ai.corouter.cc](https://ai.corouter.cc/)，省去部署、升级和日常运维这些工作。
