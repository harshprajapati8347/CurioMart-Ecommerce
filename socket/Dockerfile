# ------------------ Stage 1: Install dependencies ------------------
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


# ------------------ Stage 2: Run production app ------------------
FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 4000

CMD ["npm", "run", "start"]
