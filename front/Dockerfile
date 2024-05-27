FROM node:18-alpine


WORKDIR /app
COPY package.json yarn.lock ./
# install dependencies
ENV BACKEND_URL=http://back
ENV PORT 3000
RUN yarn install --frozen-lockfile
RUN yarn gApi
COPY . .

EXPOSE 3000


RUN npm i sharp
RUN yarn build
RUN mv ./.next/standalone ./
RUN mv ./public ./standalone/
RUN mv ./.next/static ./standalone/.next/


CMD ["node", "./standalone/server.js"]
