FROM node:18-alpine

WORKDIR /app
COPY package.json yarn.lock ./
# install dependencies
RUN yarn install --frozen-lockfile
COPY . .

EXPOSE 3000

ENV PORT 3000
ENV BACKEND_URL=http://back

CMD ["sh", "start_next.sh"]
