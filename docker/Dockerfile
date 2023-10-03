FROM cgr.dev/chainguard/node as dependencies
USER node
WORKDIR /app
COPY --chown=node:node package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm install --force

FROM cgr.dev/chainguard/node as builder
USER node
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
COPY --chown=node:node . .
COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM cgr.dev/chainguard/node as runner
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
CMD ["server.js"]
