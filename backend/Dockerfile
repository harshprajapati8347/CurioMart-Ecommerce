# ------------------ Stage 1: Install dependencies ------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


# ------------------ Stage 2: Run production app ------------------
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5000

CMD ["npm", "run", "start"]
