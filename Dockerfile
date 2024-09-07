FROM node:20


ARG DATABASE_URL
ARG NEXTAUTH_URL

ENV DATABASE_URL=$DATABASE_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

WORKDIR /app

COPY package.json package-lock.json tsconfig.json turbo.json ./


COPY apps ./apps 
COPY packages ./packages

RUN npm install

RUN cd packages/db && DATABASE_URL=$DATABASE_URL && npx prisma migrate dev && npx prisma generate && cd ../..

RUN cd ./apps/user-app && NEXTAUTH_URL=$NEXTAUTH_URL && npm run build

EXPOSE 3000

CMD ["npm", "run", "start-user-app"]

