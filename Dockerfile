FROM node:22.5.1-alpine3.20
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:1.27.0-alpine
COPY --from=0 /app/out /etc/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf