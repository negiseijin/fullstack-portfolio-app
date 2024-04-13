FROM node:20.12.1-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
ENV NODE_ENV $NODE_ENV

# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm install turbo --global
RUN turbo prune client --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build --filter=client...

FROM base AS Development
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --from=installer --chown=node:node /app .
RUN pnpm install
CMD [ "pnpm", "turbo", "dev", "--filter", "client" ]

# FROM base AS runner
# WORKDIR /app
# # Don't run production as root
# RUN addgroup --system --gid 1001 client
# RUN adduser --system --uid 1001 client
# USER client
# COPY --from=installer /app .

FROM nginx:alpine AS Prodcution
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=installer /app/apps/client/dist /usr/share/nginx/html
EXPOSE 80/tcp
CMD [ "/usr/sbin/nginx", "-g", "daemon off;" ]
